import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const boldenaFont = localFont({
  src: "../public/fonts/Boldena/BoldenaBold.ttf",
  display: "swap",
  variable: "--font-boldena",
});

export const metadata: Metadata = {
  title: "Player Tracker",
  description: "Application for tracking online games rating",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${boldenaFont.variable}`}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              border: "1px solid white",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
