import { menuData } from '@/data/menuData';
import ProductClient from './ProductClient';

export function generateStaticParams() {
  const params = [];
  
  for (const category of menuData) {
    for (const item of category.items) {
      params.push({ category: category.id, id: item.id.toString() });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  let product = null;
  for (const category of menuData) {
    const found = category.items.find(item => item.id.toString() === id);
    if (found) {
      product = found;
      break;
    }
  }

  if (!product) {
    return {
      title: 'Product Not Found | Gorilla Camp Resort',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} | Gorilla Camp Resort Menu`,
    description: product.desc
      ? `${product.desc.substring(0, 155)}…`
      : `Order ${product.name} at Gorilla Camp Resort. Price: ¥${product.price.toLocaleString()}.`,
    openGraph: {
      title: `${product.name} — Gorilla Camp Resort`,
      description: product.desc || `Discover ${product.name} at Gorilla Camp Resort.`,
      images: product.image ? [{ url: product.image, width: 800, height: 600 }] : [],
    },
  };
}

export default function ProductPage() {
  return <ProductClient />;
}
