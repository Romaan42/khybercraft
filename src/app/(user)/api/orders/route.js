import checkLoginUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Order from "@/models/orderModel";

export const GET = async () => {
  try {
    await connectDb();
    const user = await checkLoginUser();
    if (!user) {
      return Response.json(
        { success: false, message: "user not logged in!" },
        { status: 404 },
      );
    }

    const orders = await Order.find().populate("user");
    return Response.json({ success: true, orders });
  } catch (error) {
    return Response.json(
      { success: false, message: "something went wrong" },
      { status: 500 },
    );
  }
};
