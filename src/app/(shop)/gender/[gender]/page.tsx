export const revalidate = 60
import { getPaginatedProductsWithImages } from "@/actions";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import Title from "@/components/ui/title/Title";
import { Gender } from "@prisma/client";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        gender: Gender;
    }>;
    searchParams: Promise<{
        page?: string;
        take?: string;
    }>;
}


export default async function GenderPage({ params, searchParams }: Props) {

    const { gender } = await params;
    const { take, page } = await searchParams;
    if (!gender || !Object.values(Gender).includes(gender)) notFound();

    const pageNumber = page ? parseInt(page) : 1;
    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page: pageNumber, take: 12, gender });




    return (
        <div>
            <Title title={`${gender.charAt(0).toUpperCase() + gender.slice(1)} products`} className="mb-2" />
            {products.length === 0 && <div className="text-center text-2xl font-bold">No products found</div>}
            <ProductGrid products={products} />
            <Pagination totalPages={totalPages} />
        </div>
    )
}