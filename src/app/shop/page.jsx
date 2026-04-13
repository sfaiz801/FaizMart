// Shop page: passes categories to client component for interactive filtering
import ShopView from '@/components/shop/ShopView';
import { getCategories } from '@/utils/api';

export const metadata = {
  title: 'Shop — Browse All Products',
  description: 'Browse our full catalogue. Filter by category, price, and rating.',
};

export default async function ShopPage() {
  const categories = await getCategories();
  return <ShopView categories={categories} />;
}

export const dynamic = 'force-dynamic';
