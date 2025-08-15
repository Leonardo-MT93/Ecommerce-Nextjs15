export const revalidate = 604800; // 1 week

import { getProductBySlug } from "@/actions";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import ProductMobileSlideshow from "@/components/product/slideshow/ProductMobileSlideshow";
import ProductSlideShow from "@/components/product/slideshow/ProductSlideShow";
import StockLabel from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";


interface Props {
    params: Promise<{
        slug: string
    }>
}

//metadata dinamica
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const slug = (await params).slug
   
    // fetch post information
    const product = await getProductBySlug(slug);
    if (!product || 'error' in product) notFound();
   
    return {
      title: product?.title ?? "Product not found",
      description: product?.description ?? "Product not found",
      openGraph: {
        title: product?.title ?? "Product not found",
        description: product?.description ?? "Product not found",
        images: [`/products/${product?.images[1]}`],
      },
      twitter: {
        title: product?.title ?? "Product not found",
        description: product?.description ?? "Product not found",
        images: [`/products/${product?.images[1]}`],
      },
    }
  }

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product || 'error' in product) notFound();
    return (
        <div className="grid mt-5 mb-20 grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-1 md:col-span-2">
                {/* Desktop Slideshow */}
                <ProductSlideShow images={product.images} title={product.title}
                    className="hidden md:block"
                />
                {/* Mobile Slideshow */}
                <ProductMobileSlideshow images={product.images} title={product.title}
                    className="block md:hidden"
                />
            </div>
            <div className="col-span-1 px-5 ">
                <StockLabel slug={slug} />
                <h1 className={`${titleFont.className} antialiased text-xl font-bold`}>{`${product.title}`}</h1>

                <p className="mb-5 text-lg text-gray-700">{`$${product.price}`}</p>
                <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />
                <QuantitySelector quantity={2} />
                <button className="btn-primary my-5">Add to cart</button>
                <h3 className="text-sm font-bold">Description</h3>
                <p className="font-light">{`${product.description}`}</p>

            </div>
        </div>
    )
}