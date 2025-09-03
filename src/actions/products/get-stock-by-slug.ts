"use server"
import prisma from "@/lib/prisma"

export const getStockBySlug = async (slug: string) => {
    try {
        const stock = await prisma.product.findUnique({
            where: {
                slug: slug
            },
            select: {
                inStock: true
            }
        })
        return stock?.inStock ?? 0;
    } catch (error) {
        throw new Error(`Failed to fetch stock: ${error}`)
    }
}