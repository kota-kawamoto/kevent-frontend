import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "event manage",
  description: "event manage",
};

export default function RootLayout({children,}: {children: React.ReactNode;}) 
{
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
