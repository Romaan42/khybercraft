import { NextResponse } from "next/server";
import Order from "@/models/orderModel";
import Product from "@/models/productModel";
import User from "@/models/orderModel";
import connectDb from "@/lib/db";

export async function GET(req) {
  try {
    await connectDb();

    // 1. Calculate Total Revenue & Total Orders
    const orders = await Order.find({});
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0,
    );

    const products = await Product.find({});
    const activeProducts = products.filter((p) => p.isActive).length;
    const outOfStockProducts = products.filter(
      (p) => (p.stock || p.stok || 0) === 0,
    ).length;

    // 3. Count Total Registered Customers
    const totalCustomers = await User.countDocuments();

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        activeProducts,
        outOfStockProducts,
        totalCustomers,
        revenueChange: "+14.2%",
        ordersChange: "+9.1%",
        customersChange: "+15.3%",
        isRevenuePositive: true,
        isOrdersPositive: true,
        isCustomersPositive: true,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error fetching stats" },
      { status: 500 },
    );
  }
}
