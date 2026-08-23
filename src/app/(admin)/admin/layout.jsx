import "../../globals.css";
import AdminHeader from "@/components/admin/AdminHeader";
import TopSearch from "@/components/admin/TopSearch";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
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
