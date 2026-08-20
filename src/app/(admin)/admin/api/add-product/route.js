import connectDb from "@/lib/db";
import Product from "@/models/productModel";

export const POST = async (request) => {
  try {
    await connectDb();
    const {
      title,
      slug,
      category,
      price,
      salePrice,
      stok,
      description,
      sizes,
      images,
      isFeatured,
      inStock,
    } = await request.json();

    await Product.create({
      title,
      slug,
      category,
      price,
      discout: salePrice,
      stock: stok,
      description,
      sizes,
      images,
      isFeatured,
    });

    return Response.json(
      {
        success: true,
        message: "product added successfully",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("ERROR", error);
    return Response.json(
      { success: false, message: "something went wrong!" },
      { status: 500 },
    );
  }
};
