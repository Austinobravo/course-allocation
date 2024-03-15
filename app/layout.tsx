import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({subsets:['greek'], weight: ['100', '300', '400', '500', '700', '900']})

export const metadata: Metadata = {
  title: "An Online Course Allocation Project",
  description: "An Online Course Allocation Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
