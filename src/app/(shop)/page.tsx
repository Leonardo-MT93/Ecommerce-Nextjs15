export const revalidate = 60
import { getPaginatedProductsWithImages } from "@/actions";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";


interface Props {
  searchParams: Promise<{
    page?: string;
    take?: string;
  }>
}


export default async function Home({searchParams}: Props) {

  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const {products, totalPages} = await getPaginatedProductsWithImages({page, take: 12});

  if(products.length === 0) {
    redirect("/");
  }


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Title title="Shop" subtitle="All the products" className="mb-2"/>
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
