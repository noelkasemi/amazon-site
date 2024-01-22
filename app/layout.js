import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Strength Palace",
  description: "E-commerce web app using amazon associates products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Strength-Palace.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
