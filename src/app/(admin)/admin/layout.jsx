import "../../globals.css";
import AdminHeader from "@/components/admin/AdminHeader";
import TopSearch from "@/components/admin/TopSearch";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.className} h-full antialiased`}>
      <body className="min-h-full flex ">
        <AdminHeader />
        <main className="w-full">
          <TopSearch />
          {children}
        </main>
      </body>
    </html>
  );
}
