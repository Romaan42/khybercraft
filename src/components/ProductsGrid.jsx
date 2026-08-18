import React from "react";
import Product from "./Product";

export default async function ProductsGrid() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/products`, {
      cache: "force-cache",
      next: {
        revalidate: 60, // Revalidate every 60 seconds
      },
    });

    if (!res.ok) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-950 text-stone-100">
          <p className="text-lg font-semibold">Failed to load products.</p>
        </div>
      );
    }
    const data = await res.json();
    const products = data.products;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    );
  } catch (err) {
    return <h1>error while fetching products</h1>;
  }
}
