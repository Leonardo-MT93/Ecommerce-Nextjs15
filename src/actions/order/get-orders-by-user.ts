"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {

    const session = await auth();
    if (!session) {
        return {
            ok: false,
            message: "Unauthorized",
        }
    }

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                OrderAddress: {
                    select: {
                        name: true,
                        lastName: true,
                        address: true,
                        address2: true,
                        city: true,
                    }
                }
            },
        });

        return {
            ok: true,
            orders,
        }
    } catch (error) {
        return {
            ok: false,
            message: "Error getting orders",
        }
    }


}