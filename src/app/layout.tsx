import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LexAtlas",
    template: "%s — LexAtlas",
  },
  description: "Cross-border legal kits for French companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header style={{ borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
          <nav
            style={{
              maxWidth: 1024,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
            }}
            aria-label="Main"
          >
            <Link href="/" style={{ fontWeight: 700, fontSize: 18 }}>
              LexAtlas
            </Link>
            <div style={{ display: "flex", gap: 16 }}>
              <Link href="/">Home</Link>
              <Link href="/kits">Kits</Link>
            </div>
          </nav>
        </header>
        <main style={{ minHeight: "calc(100vh - 120px)" }}>{children}</main>
        <footer style={{ borderTop: "1px solid #e5e7eb", background: "#fff" }}>
          <div
            style={{
              maxWidth: 1024,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              fontSize: 14,
            }}
          >
            <span>© LexAtlas</span>
            <div style={{ display: "flex", gap: 16 }}>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
