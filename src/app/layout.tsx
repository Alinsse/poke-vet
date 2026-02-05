import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poke Vet",
  description: "Clínica veterinária para pokémons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "var(--font-inter)",
        }}
      >
        <Navbar />
        <Header />
        
        <main style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
