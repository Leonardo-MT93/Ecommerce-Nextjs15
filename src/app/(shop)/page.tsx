import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title="Shop" subtitle="All the products" className="mb-2"/>
      <ProductGrid products={products} />
    </>
  );
}
