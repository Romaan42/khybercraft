import { connectDB } from "@/lib/db"; // direct DB se lo, API call mat karo
import Product from "@/models/Product";

export const revalidate = 86400; // 24 hours me 1 baar regenerate hoga

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.khybercraft.com";

  await connectDB();

  // 1. Static Pages
  const staticRoutes = [
    { url: "", priority: 1.0, changeFrequency: "daily" },
    { url: "/shop", priority: 0.9, changeFrequency: "daily" },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { url: "/faq", priority: 0.7, changeFrequency: "monthly" },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. Dynamic Products - Direct DB se, fetch nahi
  const products = await Product.find()
    .select("slug updatedAt")
    .lean()
    .limit(50000); // sitemap limit

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 3. Agar categories bhi hain to
  // const categories = await Category.find({}).select("slug updatedAt").lean()
  // const categoryRoutes = categories.map(c => ({...}))

  return [...staticRoutes, ...productRoutes];
}
