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

export const metadata: Metadata = {
  title: 'WeddingLive - Chiếu Ảnh Khách Mời Lên Màn LED Sân Khấu Tiệc Cưới',
  description: 'Nền tảng chia sẻ ảnh cưới và trình chiếu trực tiếp lên màn hình LED phong cách Eventoly, tối ưu cho đám cưới Việt Nam.',
  keywords: ['wedding tech', 'live wedding slideshow', 'man hinh led tiec cuoi', 'chia se anh cuoi', 'vietqr cuoi'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F5] text-stone-900">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
