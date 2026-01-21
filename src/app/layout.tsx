import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SchoolFlow | Global Academy",
  description: "Modern School Management System",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1e3a5f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f8f9fa] text-[#202124] selection:bg-[#e8f0fe] selection:text-[#1a73e8] flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <main className="flex-1 pt-16 max-w-full">{children}</main>
      </body>
    </html>
  );
}
