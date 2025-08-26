import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "PortX",
  description: "Portfolio social MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-neutral-50 text-neutral-900">
        <Header />
        <main className="mx-auto max-w-4xl px-4">{children}</main>
      </body>
    </html>
  );
}
