import "./globals.css";
import SiteNavbar from "./components/SiteNavbar";

export const metadata = {
  title: "Inventory Management System",
  description: "Inventory App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050816] text-white">
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}