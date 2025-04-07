import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Big-O Complexity Analyzer',
  description: 'Analyze the time and space complexity of your code snippets',
  metadataBase: new URL('https://big-o-bot.vercel.app/'),
  openGraph: {
    title: 'Big-O Complexity Analyzer',
    description: 'Analyze the time and space complexity of your code snippets',
    images: ['/bigo-2.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big-O Complexity Analyzer',
    description: 'Analyze the time and space complexity of your code snippets',
    images: ['/bigo-2.png'],
  }
}

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