"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async (page?: number, limit?: number) => {

    const session = await auth();
    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: "Unauthorized",
        }
    }

    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc',
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
            message: `Error getting orders: ${error}`,
        }
    }


}