// import { Prisma, PrismaClient } from "@/generated/prisma";
import { initialData } from "@/seed/seed";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function main() { 
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products, users } = initialData;   

    await prisma.user.createMany({ data: users})

    await prisma.category.createMany({ data: categories.map((category) => ({ name: category })) });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map: Record<string, string>, category: { name: string; id: string }) => {
        map[category.name] = category.id;
        return map;
    }, {} as Record<string, string>);

    products.forEach(async (product) => {
        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            },
        });
        const imagesData = images.map((image) => ({
            url: image,
            productId: dbProduct.id,
        }));
        await prisma.productImage.createMany({ data: imagesData });
    });
}
main();