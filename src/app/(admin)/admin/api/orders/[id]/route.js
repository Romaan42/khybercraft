import connectDb from "@/lib/db";
import Order from "@/models/orderModel";
import { NextResponse } from "next/server";

// GET single order details
export async function GET(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching order", error: error.message },
      { status: 500 },
    );
  }
}

// PUT / Update order details
export async function PUT(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;
    const { orderStatus, paymentStatus, notes, tracking } =
      await request.json();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus,
        paymentStatus,
        notes,
        tracking,
      },
      { new: true },
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json(
      { message: "Error updating order", error: error.message },
      { status: 500 },
    );
  }
}
