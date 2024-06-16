import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To DO List",
  description: "Powered by Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{}}>
          Home for To Do List App
          <nav>
            <br />
            Navigate To :
            <ul>
              <Link href="/">Home</Link>
              <br />
              <Link href="/todo">To Do List</Link>
              <br />
              <Link href="/upload">Upload file</Link>
              <br />
              <Link href="/upload/sync">Sync</Link>
            </ul>
          </nav>
        </div>
        <div style={{}}>
          {children}
        </div>
      </body>
    </html>
  );
}
