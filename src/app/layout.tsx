import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axiom Trade Clone | Token Discovery",
  description: "Pixel-perfect replica of Axiom Trade token discovery table",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-axiom-bg text-gray-100 min-h-screen`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
            </main>
            <footer className="border-t border-axiom-border py-4 text-center text-sm text-gray-500">
              <div className="container mx-auto px-4">
                Axiom Trade Clone • Built with Next.js 14 • Not affiliated with
                Axiom
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
