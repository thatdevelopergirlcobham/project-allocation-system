import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "../context/AppContext";
import { ToastProvider } from "../components/Toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Project Allocation System",
  description: "A minimal web-based system to automate project allocation, progress tracking, and communication between students, supervisors, and administrators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
