import { Prisma, PrismaClient } from "@/generated/prisma";
import { initialData } from "@/seed/seed";

const prisma = new PrismaClient();
const productData: Prisma.ProductCreateInput[] = initialData.products.map((product) => 
    ({ title: product.title, 
        description: product.description, 
        inStock: product.inStock, 
        price: product.price, sizes: product.sizes, 
        slug: product.slug, 
        tags: product.tags, 
        gender: product.gender, 
        category: { connectOrCreate: { where: { name: product.type }, 
        create: { name: product.type }, }, }, 
        ProductImage: { create: product.images.map((image) => ({ url: image, })), }, }));
export async function main() { 

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products } = initialData;   
    await prisma.category.createMany({ data: categories.map((category) => ({ name: category })) });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
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