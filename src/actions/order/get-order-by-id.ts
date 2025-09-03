"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const getOrderById = async (id: string) => {
    const session = await auth();
    if(!session) {
        return {
            ok: false,
            message: "Unauthorized",
        }
    }

    try{
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true,
                                    },
                                    take: 1,
                                }
                            }
                        }
                    }
                }
            }
        })

        if(!order) throw new Error("Order not found");

        if( session.user.role === 'user'){
            if(session.user.id !== order.userId) {
                throw `${id} is not order of ${session.user}`;
            }
        }

        return {
            ok: true,
            order,
        }
    }catch(error){
        return {
            ok: false,
            message: `Error getting order: ${error}`,
        }
    }
}