import { Product } from "@/interfaces/product.interface"
import ProductGridItem from "./ProductGridItem"

interface Props {
    products: Product[]
}

export default function ProductGrid({ products }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 mb-10">
            {products.map((product) => (
                <ProductGridItem key={product.slug} product={product} />
            ))}
        </div>
    )
}