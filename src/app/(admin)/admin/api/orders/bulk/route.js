import connectDb from "@/lib/db";
import Order from "@/models/orderModel";

export const POST = async (request) => {
  try {
    await connectDb();
    const { ids } = await request.json();
    if (!ids && ids.length === 0) {
      return Response.json(
        { success: false, message: "orders are not selected" },
        { status: 401 },
      );
    }

    await Order.deleteMany({
      _id: {
        $in: ids,
      },
    });

    return Response.json({ success: true, message: "orders are deleted!" });
  } catch (error) {
    return Response.json(
      { success: false, message: "something went wrong!" },
      { status: 500 },
    );
  }
};
