"use server"

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;  
    quantity: number;
    size: Size;
}

export const placeOrder = async (products: ProductToOrder[], address: Address) => {


    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) {
        return {
            ok: false,
            message: "Unauthorized",
        };
    }

    const productsDB = await prisma.product.findMany({
        //Search for the products in the database
        where: {
            id: {
                in: products.map((product) => product.productId),
            },
        },
    });

    //Calculate the total quantity of the products
    const itemsInOrder = products.reduce((count, p ) => count + p.quantity, 0);

    //Calculate the total price of the products
    const { subTotal, tax, total} = products.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = productsDB.find((p) => p.id === item.productId);

        if (!product) {
            throw new Error("Product not found");
        }
        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal + totals.tax;

        return totals;
    }, {subTotal: 0, tax:0, total: 0})

    try{
        const prismaTx = await prisma.$transaction( async (tx) => {
            //1_Update the stock of the products
        
            const updatedProductsPromises = productsDB.map(async (product) => {
                const productQuantity = products.filter( p => p.productId === product.id).reduce((acc, p) => acc + p.quantity, 0);
                if(productQuantity === undefined) {
                    throw new Error("Not enough stock");
                }
                
                return tx.product.update({
                    where: {id: product.id},
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            })
        
            const updatedProducts = await Promise.all(updatedProductsPromises);
            //Validate negative stock
            updatedProducts.forEach(product => {
                if(product.inStock < 0) {
                    throw new Error(`${product.title} has not enough stock`);
                }
            })
        
            //2_Create the order - Header / Details
        
            const order = await tx.order.create({
                data: {
                    userId,
                    itemsInOrder,
                    subTotal,
                    tax,
                    total,
                    OrderItem: {
                        createMany: {
                            data: products.map((product) => ({
                                productId: product.productId,
                                quantity: product.quantity,
                                size: product.size,
                                price: productsDB.find((p) => p.id === product.productId)?.price ?? 0,
                            }))
                        }
                    }
                }
            })
        
            //Validate if the price is 0
            if (order.subTotal === 0) {
                return {
                    ok: false,
                    message: "The price is 0",
                }
            }
        
            //3_Create the order - Address
        
        
            const orderAddress = await tx.orderAddress.create({
                data: {
                    name: address.name,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    postalCode: address.postalCode,
                    city: address.city,
                    countryId: address.country,
                    orderId: order.id,
                    phone: address.phone,
                }
            })
        
        
        
            return {
                order,
                orderAddress,
                updatedProducts,
            };
        
            });

            return {
                ok: true,
                order: prismaTx.order,
                prismaTx: prismaTx,

            }

    }catch(error){
        console.error(error);
        return {
            ok: false,
            message: "Error updating stock",
        }
    }

    //create the order
    

    return {
        ok: true,
    }

    
};