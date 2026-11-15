import checkAdminLogin from "@/lib/adminLogin";
import connectDb from "@/lib/db";
import Order from "@/models/orderModel";
import User from "@/models/userModel";

export const GET = async () => {
  try {
    await connectDb();
    const admin = await checkAdminLogin();
    if (!admin) {
      return Response.json(
        { success: false, message: "admin are not logged in" },
        { status: 401 },
      );
    }

    const users = await User.find();
    if (!users) {
      return Response.json(
        { success: false, message: "user's not found" },
        { status: 401 },
      );
    }

    const dbOrders = await Order.find();
    const totalUsers = users.map((user) => {
      const userOrders = dbOrders.filter(
        (o) => o.user.toString() === user._id.toString(),
      );
      const spend = userOrders.reduce((acc, curr) => {
        return (acc += curr.totalAmount);
      }, 0);
      return { ...user.toObject(), orders: userOrders.length, spend };
    });

    return Response.json({ success: true, users: totalUsers });
  } catch (error) {
    return Response.json(
      { success: false, message: "something went wrong" },
      { status: 500 },
    );
  }
};
