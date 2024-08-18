// app/auth/signIn/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './signIn.css'; // Import specific CSS for SignIn page

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce App SignIn Page",
  description: "Created by Furquan Anwer",
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className={inter.className}>
        {children}
      </main>
    </div>
  );
}
