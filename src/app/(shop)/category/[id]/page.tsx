import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { Gender } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: {
        id: Gender
    }
}
const seedProducts = initialData.products;

export default function CategoryPage({ params }: Props) {

    const { id } = params;

    // if ( !id || !Object.values(Gender).includes(id as Gender) ) notFound();

    const products = seedProducts.filter(product => product.gender === id);

    return (
        <div>
            <Title title={`${id.charAt(0).toUpperCase() + id.slice(1)} products`} subtitle="All the products" className="mb-2"/>
            <ProductGrid products={products} />
        </div>
    )
}