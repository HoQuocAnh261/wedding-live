import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'WeddingLive - Live Banquet Photo Sharing & Big Screen Slideshow',
  description:
    'Turn your guests smartphones into a live digital camera. Photos stream directly to the banquet projector screen in real-time. Inspired by Eventoly & Kululu for modern weddings.',
  keywords: [
    'wedding tech',
    'live wedding slideshow',
    'reception photo sharing',
    'wedding guest camera',
    'big screen wedding slideshow',
    'weddinglive',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F5] text-stone-900">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}

