
import { getCategories, getProductBySlug } from "@/actions";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: Promise<{
        slug: string;
    }>
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;

    const [categories, product] = await Promise.all([
        getCategories(),
        getProductBySlug(slug)
    ]);

    if (!product && slug !== 'new') {
        redirect('/admin/products');
    }

    if (product && 'error' in product && slug !== 'new') {
        redirect('/admin/products');
    }

    const title = (slug === 'new') ? "Create Product" : "Edit Product";
    return (
        <>
            <Title title={title} />

            <ProductForm product={(product && !('error' in product)) ? product : {}} categories={categories}/>
        </>
    )
}
