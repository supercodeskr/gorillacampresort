import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/app/components/CartDrawer';
import Footer from '@/app/components/Footer';
import MobileBottomNav from '@/app/components/MobileBottomNav';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'ゴリラキャンプリゾート | Gorilla Camp Resort — 埼玉のプレミアムBBQ',
  description: '埼玉県毛呂山町にある最高のBBQリゾート。世界各国のBBQ料理を500㎡+の広大な敷地でお楽しみください。100名収容可能。Saitama\'s ultimate BBQ destination — World BBQ Tour featuring India, Korea, USA, Indonesia & Argentina.',
  keywords: ['BBQ', 'バーベキュー', '埼玉', 'Saitama', 'Gorilla Camp Resort', 'ゴリラキャンプリゾート', 'キャンプ', 'リゾート'],
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Gorilla Camp Resort — The World BBQ Tour',
    description: 'Premium jungle-themed BBQ in Saitama, Japan. 100-person capacity, 500㎡+ resort.',
    locale: 'ja_JP',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0c0c0c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <CartProvider>
            {children}
            <Footer />
            <CartDrawer />
            <MobileBottomNav />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
