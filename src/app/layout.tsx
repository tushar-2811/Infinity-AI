import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";


import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import UserProvider from "@/hooks/userProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Infinity",
  description: "Your AI BestFriend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
      <ThemeProvider  
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
      <body className={inter.className}>
        {children}
      </body>
       <Toaster />
      </ThemeProvider>
      </UserProvider>
    </html>
  );
}
