export default async function sitemap() {
  const res = await fetch(`${process.env.BASE_URL}/api/products`);
  const result = await res.json();
  const products = result.products || [];
  return [
    {
      url: "https://www.khybercraft.com",
      lastModified: new Date(),
    },
    {
      url: "https://www.khybercraft.com/shop",
      lastModified: new Date(),
    },
    {
      url: "https://www.khybercraft.com/contact",
      lastModified: new Date(),
    },
    ...products.map((product) => ({
      url: `https://www.khybercraft.com/products/${product.slug}`,
      lastModified: new Date(product.updatedAt),
    })),
  ];
}
