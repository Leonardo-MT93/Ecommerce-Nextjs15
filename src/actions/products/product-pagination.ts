"use server";

import { Gender } from "@/generated/prisma";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {

    if (isNaN(page) || page < 1) page = 1;
    if (take < 1 || take > 20) take = 12;


    try {
        // Ejecutar ambas consultas en paralelo con Promise.all
        const [products, totalCount] = await Promise.all([
            // Consulta de productos paginados
            prisma.product.findMany({
                skip: (page - 1) * take,
                take,
                where: {
                    gender: gender ?? undefined
                },
                include: {
                    ProductImage: {
                        take: 2,
                        select: {
                            url: true,
                        }
                    }
                }
            }),
            // Consulta del conteo total
            prisma.product.count({
                where: {
                    gender: gender ?? undefined
                }
            })
        ]);

        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages,
            products: products.map((product) => ({
                ...product,
                images: product.ProductImage.map((image) => image.url)
            })),
        }
    } catch (error) {
        throw new Error("Error fetching products");
    }
}