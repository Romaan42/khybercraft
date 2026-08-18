import connectDb from "@/lib/db";
import Product from "@/models/productModel";

export const GET = async (_, { params }) => {
  try {
    await connectDb();
    const { slug } = await params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return Response.json(
        { success: false, message: "product not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, product });
  } catch (error) {
    return Response.json(
      { success: false, message: "something went wrong!" },
      {
        status: 500,
      },
    );
  }
};
