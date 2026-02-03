import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import AppWrapper from "@/components/AppWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "xeVosVault",
  description: "The ultimate repository for source codes, templates, and development guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script - runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {/* Smooth Cursor Effect */}
        <SmoothCursor />

        {/* Fixed Theme Toggler - Always visible */}
        <div className="fixed top-6 right-6 z-[100]">
          <AnimatedThemeToggler className="p-3 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg" />
        </div>

        {/* App Wrapper with Loading Screen */}
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
