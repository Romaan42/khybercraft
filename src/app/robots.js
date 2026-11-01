export default function robots() {
  return {
    rules: [
      {
        userAgent: "*", // Sab bots ke liye
        allow: "/", // Sab allow
        disallow: [
          "/admin/", // Admin block
          "/api/", // API block
          "/cart", // Cart block
          "/checkout", // Checkout block
          "/private/",
        ],
      },
      {
        userAgent: "Googlebot", // Google ke liye special
        allow: "/",
      },
    ],
    sitemap: "https://www.khybercraft.com/sitemap.xml",
    host: "https://www.khybercraft.com",
  };
}
