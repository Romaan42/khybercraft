import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import https from "node:https";
import checkLoginUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Cart from "@/models/cartModel";
import Order from "@/models/orderModel";

export const runtime = "nodejs";

const SAFEPAY_HOST = "https://sandbox.api.getsafepay.com";

// ===== Safepay Fetch - fetch ki jagah ye use hoga =====
// Ye fetch jaisa hi hai, lekin IPv4 force karta hai
// Isliye ETIMEDOUT nahi aayega
function safepayFetch(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body || {});
    const req = https.request(
      url,
      {
        method: "POST",
        family: 4, // Sirf IPv4 use karo, IPv6 ko block karo
        lookup: (host, opts, cb) =>
          dns.lookup(host, { ...opts, family: 4 }, cb),
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_SECRET_KEY,
        },
        timeout: 30000, // 30 sec tak wait karo
      },
      (res) => {
        let text = "";
        res.on("data", (chunk) => (text += chunk));
        res.on("end", () =>
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 400,
            status: res.statusCode,
            text,
          }),
        );
      },
    );
    req.on("timeout", () => req.destroy(new Error("Safepay timeout")));
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

export const POST = async (request) => {
  try {
    // 1. Connect database
    await connectDb();

    // 2. Authenticate user
    const user = await checkLoginUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not logged in",
        },
        { status: 401 },
      );
    }

    // 3. Read request body
    const {
      shippingAddress,
      paymentMethod,
      orderItems,
      subtotal,
      shippingFee,
      totalAmount,
    } = await request.json();

    // 4. Validate request
    if (
      !shippingAddress ||
      !paymentMethod ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0
    ) {
      return Response.json(
        {
          success: false,
          message: "Missing order information",
        },
        { status: 400 },
      );
    }

    const amounts = {
      subtotal: Number(subtotal),
      shippingFee: Number(shippingFee),
      totalAmount: Number(totalAmount),
    };

    if (
      !Object.values(amounts).every(Number.isFinite) ||
      amounts.subtotal < 0 ||
      amounts.shippingFee < 0 ||
      amounts.totalAmount <= 0
    ) {
      return Response.json(
        {
          success: false,
          message: "Invalid payment amount",
        },
        { status: 400 },
      );
    }

    // 5. Check payment method
    const isCardPayment = paymentMethod === "CARD";

    // 6. Check Safepay environment variables before creating order
    if (isCardPayment) {
      const secretKey = process.env.SAFEPAY_SECRET_KEY;
      const apiKey = process.env.SAFEPAY_API_KEY;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

      if (!secretKey || !apiKey || !siteUrl) {
        throw new Error("Missing Safepay environment variables");
      }
    }

    // 7. Create order in database
    const order = await Order.create({
      user: user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      subtotal: amounts.subtotal,
      shippingFee: amounts.shippingFee,
      totalAmount: amounts.totalAmount,
      paymentStatus: isCardPayment ? "Pending" : "COD",
    });

    // 8. COD / Bank Transfer handling
    if (!isCardPayment) {
      await Cart.deleteMany({ user: user._id });

      return Response.json(
        {
          success: true,
          message: "Order placed successfully",
          order,
        },
        { status: 201 },
      );
    }

    // 9. Create Safepay payment session - POST /order/payments/v3/
    const sessionRes = await safepayFetch(
      `${SAFEPAY_HOST}/order/payments/v3/`,
      {
        merchant_api_key: process.env.SAFEPAY_API_KEY,
        intent: "CYBERSOURCE",
        mode: "payment",
        currency: "PKR",
        amount: Math.round(amounts.totalAmount * 100),
      },
    );

    const sessionText = sessionRes.text;

    if (!sessionRes.ok) {
      throw new Error("Session failed: " + sessionText);
    }

    const sessionData = JSON.parse(sessionText);
    const trackerToken =
      sessionData?.data?.tracker?.token || sessionData?.tracker?.token;

    if (!trackerToken) {
      throw new Error("Safepay tracker token missing: " + sessionText);
    }

    // 10. Generate passport token - POST /client/passport/v1/token
    const passportRes = await safepayFetch(
      `${SAFEPAY_HOST}/client/passport/v1/token`,
      {},
    );

    const passportText = passportRes.text;

    if (!passportRes.ok) {
      throw new Error("Passport failed: " + passportText);
    }

    const passportData = JSON.parse(passportText);
    const tbt =
      typeof passportData?.data === "string"
        ? passportData.data
        : passportData?.data?.token || passportData?.token;

    if (!tbt) {
      throw new Error("Safepay passport token missing: " + passportText);
    }

    // 11. Save tracker in order
    order.tracker = trackerToken;
    await order.save();

    // 12. Prepare redirect URLs
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    const successUrl = `${siteUrl}/order-success?order=${order._id}`;
    const cancelUrl = `${siteUrl}/failed?order=${order._id}`;

    // 13. Generate Safepay Hosted Checkout URL
    // IMPORTANT: /checkout NAHI, /embedded hai - warna "Required environment is missing" aayega
    const checkoutUrl =
      `${SAFEPAY_HOST}/embedded` +
      `?tracker=${encodeURIComponent(trackerToken)}` +
      `&tbt=${encodeURIComponent(tbt)}` +
      `&environment=sandbox` +
      `&source=hosted` +
      `&redirect_url=${encodeURIComponent(successUrl)}` +
      `&cancel_url=${encodeURIComponent(cancelUrl)}`;

    // 14. Return checkout URL to client
    return Response.json(
      {
        success: true,
        message: "Proceed to Safepay payment",
        orderId: order._id,
        order,
        checkoutUrl,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("ORDER API ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 },
    );
  }
};
