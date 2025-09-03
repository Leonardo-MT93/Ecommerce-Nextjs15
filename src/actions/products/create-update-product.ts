"use server"

import prisma from "@/lib/prisma"
import { Gender, Product, Size } from "@prisma/client"
import { revalidatePath } from "next/cache"
import z from "zod"

//Example of SchemaValidation with Zod
const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.nativeEnum(Gender),
    categoryId: z.string().uuid(),
})

export const createUpdateProduct = async (formData: FormData) => {

    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
        console.log(productParsed.error);
        return {
            ok: false,
            message: "Invalid data",
        }
    }
    const product = productParsed.data;

    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest } = product;

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            let product: Product;

            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());
            if (id) {
                product = await prisma.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            }
            else {
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            }

            //Charge and upload the images
            if (formData.getAll('images').length > 0) {
                console.log('images', formData.getAll('images'));
            }

            return {
                product
            }
        });
        revalidatePath(`/admin/products`);
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);
        return {
            ok: true,
            product: prismaTx.product
        }
    } catch (error) {
        return {
            ok: false,
            message: "Error creating or updating product",
        }
    }



}