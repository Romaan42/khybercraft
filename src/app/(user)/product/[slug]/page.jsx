import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle2,
} from "lucide-react";
import ProductInteractiveSection from "@/components/ProductInteractiveControls";
import Product from "@/components/Product";
import ReviewSubmissionForm from "@/components/ReviewSubmission";

async function getReviews(id) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/review/${id}`, {
      cache: "no-store", // Ensures reviews are always fresh on submission
    });
    const result = await res.json();

    return result.success ? result.reviews : [];
  } catch (error) {
    return [];
  }
}

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
  if (!product) notFound();

  // Fetch reviews using the product's unique ID
  const reviews = await getReviews(product._id);

  const relatedProducts = await getRelatedProducts(product._id);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, item) => acc + item.stars, 0) / reviews.length
        ).toFixed(1)
      : "5.0";

  // SEO-friendly JSON-LD Schema with Product + Reviews/AggregateRating
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
    aggregateRating:
      reviews.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: averageRating,
            reviewCount: reviews.length,
            bestRating: "5",
            worstRating: "1",
          }
        : undefined,
    review: reviews.map((rev) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: rev.author,
      },
      datePublished: rev.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: rev.stars,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: rev.message,
    })),
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

        {/* SEO-Friendly Customer Reviews Section & Submission Layout */}
        <section className="mt-20 pt-12 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Star size={14} className="fill-amber-500" /> Customer Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-1">
                Verified Reviews {reviews.length}
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 px-4 py-2 rounded-xl">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(Number(averageRating))
                        ? "fill-amber-500"
                        : ""
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-stone-100">
                {averageRating}
              </span>
              <span className="text-xs text-stone-400">/ 5.0 Overall</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: List of Reviews */}
            <div className="lg:col-span-7 space-y-4">
              {reviews.length === 0 ? (
                <div className="bg-stone-900/40 border border-stone-800/80 p-8 rounded-2xl text-center text-stone-400 text-sm">
                  No reviews yet. Be the first to share your experience with
                  this item!
                </div>
              ) : (
                reviews.map((rev) => {
                  const date = new Date(rev.createdAt);

                  rev.date = date.toLocaleDateString();
                  rev.time = date.toLocaleTimeString();
                  return (
                    <div
                      key={rev._id}
                      className="bg-stone-900/60 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < rev.stars
                                    ? "fill-amber-500"
                                    : "text-stone-700"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-xs text-stone-500">
                            {rev.date} . {rev.time}
                          </span>
                        </div>
                        <p className="text-stone-300 text-sm leading-relaxed mb-4">
                          &quot;{rev.message}&quot;
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-stone-800/60 text-xs">
                        <span className="font-semibold text-stone-200">
                          {rev.userId.name}
                        </span>
                        {rev.verified && (
                          <span className="flex items-center gap-1 text-emerald-500">
                            <CheckCircle2 size={13} /> Verified Buyer
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Review Submission Form */}
            <div className="lg:col-span-5 sticky top-8">
              <ReviewSubmissionForm productId={product._id} />
            </div>
          </div>
        </section>

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
