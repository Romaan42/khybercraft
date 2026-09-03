export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*", "/admin/*", "/checkout/*", "/cart/*"],
    },
    sitemap: "https://www.khybercraft.com/sitemap.xml",
  };
}
