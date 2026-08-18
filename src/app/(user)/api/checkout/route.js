import checkLoginUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Cart from "@/models/cartModel";
import Order from "@/models/orderModel";

export const POST = async (request) => {
  try {
    await connectDb();
    const {
      shippingAddress,
      paymentMethod,
      orderItems,
      subtotal,
      shippingFee,
      totalAmount,
    } = await request.json();

    const user = await checkLoginUser();
    if (!user) {
      return Response.json(
        { success: false, message: "user not logged in" },
        { status: 401 },
      );
    }

    const order = await Order.create({
      user: user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      totalAmount,
    });
    await Cart.deleteMany({ user: user._id });
    return Response.json(
      { success: true, message: "order placed", order },
      { status: 201 },
    );
  } catch (error) {
    console.log("ERROR", error);
    return Response.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
};
