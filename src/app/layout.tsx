import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SchoolFlow | Global Academy",
  description: "Modern School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f8f9fa] text-[#202124] selection:bg-[#e8f0fe] selection:text-[#1a73e8] flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
      </body>
    </html>
  );
}
