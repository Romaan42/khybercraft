import checkLoginUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Cart from "@/models/cartModel";
import Order from "@/models/orderModel";

export const runtime = "nodejs";

export const POST = async (request) => {
  try {
    // 1. Connect database
    await connectDb();

    // 2. Authenticate user - tumhari wali hi function
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

    // 3. Read request body - tumhari wali hi fields
    const { shippingAddress, orderItems, subtotal, shippingFee, totalAmount } =
      await request.json();

    // 4. Validate request - paymentMethod ki zaroorat nahi, ye route hi COD ka hai
    if (
      !shippingAddress ||
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

    // 5. Create order in database - tumhari wali hi values
    // paymentMethod force COD, paymentStatus tumhare purane code jaisa "COD"
    const order = await Order.create({
      user: user._id,
      orderItems,
      shippingAddress,
      paymentMethod: "COD",
      subtotal: amounts.subtotal,
      shippingFee: amounts.shippingFee,
      totalAmount: amounts.totalAmount,
      paymentStatus: "COD",
      tracker: "",
    });

    // 6. Cart clear karo
    await Cart.deleteMany({ user: user._id });

    return Response.json(
      {
        success: true,
        message: "Order placed successfully",
        order,
        orderId: order._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("COD API ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 },
    );
  }
};
