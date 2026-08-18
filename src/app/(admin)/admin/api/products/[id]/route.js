import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Product from "@/models/productModel";

// GET single product by ID
export async function GET(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product", error: error.message },
      { status: 500 },
    );
  }
}

// PUT / Update product by ID
export async function PUT(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;
    const body = await request.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title: body.title,
        slug: body.slug,
        category: body.category,
        price: body.price,
        salePrice: body.salePrice,
        stok: body.stok,
        description: body.description,
        sizes: body.sizes,
        images: body.images,
        isFeatured: body.isFeatured,
        inStock: body.inStock,
      },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating product", error: error.message },
      { status: 500 },
    );
  }
}

// DELETE prodcot by id
export async function DELETE(_, { params }) {
  try {
    const { id } = await params;
    await connectDb();
    await Product.findByIdAndDelete(id);
    return Response.json({ success: true, message: "product deleted" });
  } catch (error) {
    console.log("ERROR", error);
    return Response.json(
      { success: true, message: "something went wrong!" },
      { status: 500 },
    );
  }
}
