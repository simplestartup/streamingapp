import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layout/sidebar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StreamTracker',
  description: 'Track your streaming content across platforms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-gray-50 px-8">
                {children}
              </main>
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}