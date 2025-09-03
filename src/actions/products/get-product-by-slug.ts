"use server"

import prisma from "@/lib/prisma"


export const getProductBySlug = async (slug: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                slug: slug
            },
            include: {
                ProductImage: true
            },
        })
        if (!product) {
            return {
                error: "Product not found"
                
            }
        }
        return {
            ...product,
            images: product.ProductImage.map((image) => image.url),
            ProductImage: product.ProductImage.map((image) => ({
                id: image.id,
                url: image.url,
                productId: image.productId
            }))
        }
    } catch (error) {   
        throw new Error(`Failed to fetch product: ${error}`)
    }
}