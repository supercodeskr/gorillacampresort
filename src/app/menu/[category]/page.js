import { menuData } from '@/data/menuData';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import CategoryClient from './CategoryClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = menuData.find(cat => cat.id === resolvedParams.category);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.titleEn || category.title} | Gorilla Camp Resort`,
    description: `Explore our delicious ${category.title} menu at Gorilla Camp Resort. Authentic flavors from the flames of Saitama.`,
  };
}

export function generateStaticParams() {
  return menuData.map((category) => ({
    category: category.id,
  }));
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const categoryData = menuData.find(cat => cat.id === resolvedParams.category);

  if (!categoryData) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#111827', padding: '120px 24px 60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
          {categoryData.title}
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.2rem', marginTop: '16px' }}>
          Gorilla Camp Resort Menu
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 100px' }}>
        <CategoryClient categoryData={{ ...categoryData, icon: undefined }} />
      </div>
      
      <Footer />
    </main>
  );
}
