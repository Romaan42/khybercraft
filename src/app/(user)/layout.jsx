import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProvider from "@/components/storeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Khybercraft | spend less smile more",
  description:
    "Authentic Charsadda handmade leather chappals crafted from premium full-grain leather. Discover traditional Peshawari craftsmanship at KhyberCraft.",
  keywords: [
    "peshawari chappal",
    "charsadda chappal",
    "handmade leather chappal",
    "traditional footwear",
    "authentic peshawari chappal",
    "khybercraft",
    "premium leather chappal",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <Header />
          <main className="min-h-[80vh]">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
