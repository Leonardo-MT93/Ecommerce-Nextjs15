"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (orderId: string, transactionId: string) => {

    try {

        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                transactionId: transactionId
            }
        })

        if (!order) {
            return {
                ok: false,
                message: `Order ${orderId} not found`
            }
        }

        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Error creating transactionId'
        }
    }


}
