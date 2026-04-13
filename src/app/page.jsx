// Home page: fetches data server-side and renders all sections
import HeroBanner from '@/components/home/HeroBanner';
import CategoryStrip from '@/components/home/CategoryStrip';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import DealBanner from '@/components/home/DealBanner';
import NewArrivals from '@/components/home/NewArrivals';
import Testimonials from '@/components/home/Testimonials';
import NewsletterBanner from '@/components/home/NewsletterBanner';
import { getProducts, getCategories } from '@/utils/api';

export const metadata = {
  title: 'ShopNest — Modern Online Store',
  description: 'Shop electronics, fashion, home decor and more at unbeatable prices.',
};

export default async function HomePage() {
  const [featured, arrivals, categories] = await Promise.all([
    getProducts({ limit: 8, skip: 0 }),
    getProducts({ limit: 8, skip: 24 }),
    getCategories(),
  ]);

  return (
    <>
      <HeroBanner />
      <CategoryStrip categories={categories.slice(0, 10)} />
      <FeaturedProducts products={featured.products || []} />
      <DealBanner />
      <NewArrivals products={arrivals.products || []} />
      <Testimonials />
      <NewsletterBanner />
    </>
  );
}

// Force dynamic rendering - prevents build-time API fetch failures
export const dynamic = 'force-dynamic';
