import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ImageKit Next.js Integration",
  description: "Demo of ImageKit integration with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-300 flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 md:py-12">{children}</main>
        </Providers>
      </body>
    </html>
  );
}