import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
import https from "node:https";
import connectDb from "@/lib/db";
import Order from "@/models/orderModel";
import Cart from "@/models/cartModel";

export const runtime = "nodejs";
const SAFEPAY_HOST = "https://sandbox.api.getsafepay.com";

function safepayGet(path) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      SAFEPAY_HOST + path,
      {
        method: "GET",
        family: 4,
        lookup: (host, opts, cb) =>
          dns.lookup(host, { ...opts, family: 4 }, cb),
        headers: {
          "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_SECRET_KEY,
        },
        timeout: 30000,
      },
      (res) => {
        let text = "";
        res.on("data", (c) => (text += c));
        res.on("end", () => resolve({ ok: res.statusCode < 400, text }));
      },
    );
    req.on("error", reject);
    req.end();
  });
}

export const GET = async (request) => {
  try {
    await connectDb();
    let orderId = new URL(request.url).searchParams.get("order");
    orderId = orderId?.split("?")[0]?.split("&")[0]?.split("%3F")[0]?.trim();

    if (!orderId || orderId.length !== 24) {
      return Response.json(
        { success: false, message: "Invalid order id" },
        { status: 400 },
      );
    }
    const order = await Order.findById(orderId);
    if (!order) return Response.json({ success: false }, { status: 404 });

    if (order.paymentStatus === "Paid") {
      return Response.json({ success: true, status: "Paid" });
    }

    let tracker = order?.tracker;

    if (!tracker) {
      tracker = new URL(request.url).searchParams.get("tracker");
    }

    if (!tracker) {
      const decoded = decodeURIComponent(request.url);
      const m = decoded.match(/tracker=([^&\s?]+)/);
      if (m) tracker = m[1];
    }

    if (!tracker) {
      return Response.json(
        {
          success: false,
          message: "Tracker missing - order me tracker save nahi hua",
        },
        { status: 400 },
      );
    }

    // Aage ke liye DB me bhi save kar do
    if (!order.tracker) {
      order.tracker = tracker;
      await order.save();
    }

    const res = await safepayGet(`/reporter/api/v1/payments/${tracker}`);
    const data = JSON.parse(res.text);

    const trackerStatus =
      data?.data?.tracker?.status ||
      data?.data?.status ||
      data?.tracker?.status ||
      data?.status ||
      "";
    const state = data?.data?.state || data?.state || "";
    const paymentState =
      data?.data?.payment?.state || data?.payment?.state || "";

    const isPaid =
      trackerStatus === "TRACKER_ENDED" ||
      state === "TRACKER_ENDED" ||
      trackerStatus === "ENDED" ||
      state === "ENDED" ||
      paymentState === "PAID" ||
      paymentState === "COMPLETED" ||
      data?.data?.is_paid === true;

    if (isPaid) {
      order.paymentStatus = "Paid";
      await order.save();
      await Cart.deleteMany({ user: order.user });
      return Response.json({ success: true, status: "Paid" });
    }

    return Response.json({ success: true, status: order.paymentStatus });
  } catch (e) {
    console.error(e);
    return Response.json(
      { success: false, message: e.message },
      { status: 500 },
    );
  }
};
