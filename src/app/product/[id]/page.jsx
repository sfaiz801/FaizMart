// Product detail page: server-side data fetch, passes to client component
import ProductDetail from '@/components/product/ProductDetail';
import { getProductById } from '@/utils/api';

export async function generateMetadata({ params }) {
  const p = await getProductById(params.id);
  return { title: p.title, description: p.description };
}

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);
  return <ProductDetail product={product} />;
}
