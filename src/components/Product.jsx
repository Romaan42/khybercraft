import Link from "next/link";
import AddToCart from "./AddToCart";
import { Star } from "lucide-react";

export default function Product({ product }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-stone-800 bg-stone-900 transition hover:border-amber-500/40 hover:shadow-[0_35px_60px_-30px_rgba(251,191,36,0.6)]">
      <div className="relative overflow-hidden bg-stone-950">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-4 flex items-start justify-between px-4">
          {product.badge ? (
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300 backdrop-blur-sm">
              {product.badge}
            </span>
          ) : null}
          <span className="rounded-full border border-stone-800 bg-stone-950/95 px-3 py-1 text-[11px] text-stone-300">
            {product.tag}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-xs text-stone-500">({product.reviews})</span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="text-xl font-semibold text-stone-100 transition group-hover:text-amber-400">
              {product.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {product.shortDescription}
            </p>
          </Link>

          <div className="flex flex-wrap gap-2">
            {product.color ? (
              <span className="rounded-full border border-stone-800 bg-stone-950/90 px-3 py-1 text-[11px] text-stone-300">
                {product.color}
              </span>
            ) : null}
            {product.soleType ? (
              <span className="rounded-full border border-stone-800 bg-stone-950/90 px-3 py-1 text-[11px] text-stone-300">
                {product.soleType}
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-amber-400">
              {product.price}
            </span>
            <span className="text-sm text-stone-500 line-through">
              {product.originalPrice}
            </span>
          </div>
          <AddToCart
            product={{
              _id: product._id,
              title: product.title,
              price: product.price,
              image: product.images[0],
            }}
          />
        </div>
      </div>
    </div>
  );
}
