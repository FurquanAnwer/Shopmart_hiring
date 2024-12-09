import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/Footer";
import Providers from "../redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "Created by Furquan Anwer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <div className="flex flex-col min-h-screen">
          <NavBar/>
          <main className="flex-grow">{children}</main>
          <Footer/>
         
        </div>
        </Providers>
        
      </body>
    </html>
  );
}
