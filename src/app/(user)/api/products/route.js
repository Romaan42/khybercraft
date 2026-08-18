import connectDb from "@/lib/db";
import Product from "@/models/productModel";

export const GET = async () => {
  try {
    await connectDb();
    const products = await Product.find();
    return Response.json({
      success: true,
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
};
