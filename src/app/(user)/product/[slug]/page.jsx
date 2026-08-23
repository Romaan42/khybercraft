import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import ProductInteractiveSection from "@/components/ProductInteractiveControls";
import Product from "@/components/Product";

async function getProductBySlug(slug) {
  const res = await fetch(`${process.env.BASE_URL}/api/product/${slug}`);
  const result = await res.json();

  if (!result.success) {
    return null;
  }

  return result.product;
}

async function getRelatedProducts(currentId) {
  const res = await fetch(`${process.env.BASE_URL}/api/products`);
  const result = await res.json();
  return result.products.filter((product) => product._id !== currentId);
}

export default async function page({ params }) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  const relatedProducts = await getRelatedProducts(product._id);
  if (!product) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription || product.description || "",
    image: product.images || [],
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "PKR",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://yourdomain.com/products/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-stone-400">
            <li>
              <Link href="/" className="hover:text-amber-500 transition">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={12} />
            </li>
            <li>
              <Link href="/shop" className="hover:text-amber-500 transition">
                Shop
              </Link>
            </li>
            <li>
              <ChevronRight size={12} />
            </li>
            <li className="capitalize hover:text-amber-500 transition">
              <Link href={`/category/${product.category}`}>
                {product.category}
              </Link>
            </li>
            <li>
              <ChevronRight size={12} />
            </li>
            <li className="text-amber-500 font-medium truncate max-w-45">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Product Interactive Main Grid */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <ProductInteractiveSection product={product} />

          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-stone-800">
            <div className="bg-stone-900 border border-stone-800/80 p-4 rounded-xl flex items-center gap-4">
              <ShieldCheck size={24} className="text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider">
                  Pure Leather Guaranteed
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Handcrafted from premium cowhide leather.
                </p>
              </div>
            </div>

            <div className="bg-stone-900 border border-stone-800/80 p-4 rounded-xl flex items-center gap-4">
              <Truck size={24} className="text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider">
                  Nationwide Delivery
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Cash on Delivery in 2–4 business days.
                </p>
              </div>
            </div>
            <div className="bg-stone-900 border border-stone-800/80 p-4 rounded-xl flex items-center gap-4">
              <RotateCcw size={24} className="text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider">
                  Easy Size Exchange
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Free exchange within 7 days of purchase.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Products / Cross-Selling Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-stone-800">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles size={14} /> Similar Designs
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-1">
                  You Might Also Like
                </h2>
              </div>
              <Link
                href={`/category/${product.category}`}
                className="text-stone-400 hover:text-amber-500 text-xs font-semibold flex items-center gap-1 transition"
              >
                View Collection <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Product product={item} key={item._id} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
