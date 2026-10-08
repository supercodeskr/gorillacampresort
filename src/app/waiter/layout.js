export const metadata = {
  title: 'Gorilla Waiter',
  description: 'Gorilla Camp Resort — table orders and bills',
  manifest: '/waiter-manifest.json',
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: 'Gorilla Waiter', statusBarStyle: 'black-translucent' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1f3d2b',
};

export default function WaiterLayout({ children }) {
  return children;
}
