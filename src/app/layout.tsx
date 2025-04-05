import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Big-O: Code Complexity Analysis Tool',
  description: 'Analyze the time and space complexity of your code snippets instantly. Get accurate Big O notation analysis for your algorithms.',
  keywords: 'big o notation, time complexity, space complexity, algorithm analysis, code complexity, algorithm efficiency',
  authors: [{ name: 'Mayank Shekhar' }],
  openGraph: {
    title: 'Big-O - Code Complexity Analysis Tool',
    description: 'Analyze the time and space complexity of your code snippets instantly',
    url: 'https://big-o-bot.vercel.app/',
    siteName: 'Big O Analyzer',
    images: [
      {
        // Make sure this exactly matches the case of your actual file
        url: '/bigo-2.png', // Check if this should be lowercase
        width: 1200,
        height: 630,
        alt: 'Big O Analyzer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big O Analyzer - Code Complexity Analysis Tool',
    description: 'Analyze the time and space complexity of your code snippets instantly',
    // Make sure this exactly matches the case of your actual file
    images: ['/bigo-2.png'], // Check if this should be lowercase
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}