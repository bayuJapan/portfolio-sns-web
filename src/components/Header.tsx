"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/feed", label: "Feed" },
  { href: "/discover", label: "Discover" },
  { href: "/alpha", label: "alpha" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <nav className="mx-auto max-w-4xl px-4 h-12 flex items-center gap-4">
        <div className="font-semibold">PortX</div>
        <ul className="flex items-center gap-3 text-sm">
          {tabs.map(t => {
            const active = pathname === t.href;
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className={active ? "font-semibold underline" : "text-neutral-600 hover:text-black"}
                >
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
