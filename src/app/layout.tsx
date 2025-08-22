import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GitHub Badge Maker | Create Beautiful Badges for Your Repositories",
  description: "Create stunning, customizable badges for your GitHub repositories with real-time preview. Choose from templates or design your own with our intuitive badge maker.",
  keywords: ["github", "badges", "shields", "repository", "markdown", "readme", "status badges"],
  authors: [{ name: "GitHub Badge Maker" }],
  creator: "GitHub Badge Maker",
  publisher: "GitHub Badge Maker",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github-badge-maker.vercel.app",
    title: "GitHub Badge Maker",
    description: "Create beautiful badges for your GitHub repositories",
    siteName: "GitHub Badge Maker",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Badge Maker",
    description: "Create beautiful badges for your GitHub repositories",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
