import "./globals.css";
import Link from "next/link";
export const metadata = { title: "PortX", description: "Portfolio Social MVP" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
          <nav className="mx-auto max-w-5xl px-4 h-14 flex items-center gap-4">
            <Link href="/feed" className="font-bold">PortX</Link>
            <div className="ml-auto flex gap-4">
              <Link href="/feed">Feed</Link>
              <Link href="/discover">Discover</Link>
              <Link href="/alpha">@alpha</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
