"use server"

import prisma from "@/lib/prisma"

export const deleteUserAddress = async (userId: string) => {
    try {
        const existingAddress = await prisma.userAddress.findUnique({
            where: { userId }
        })

        if (!existingAddress) {
            return {
                ok: false,
                message: 'Address not found to delete'
            }
        }

        await prisma.userAddress.delete({
            where: { userId }
        })

        return {
            ok: true,
            message: 'Address deleted successfully'
        }
    }
    catch (error) {
        console.log(error)
        return {
            ok: false,
            message: `Error deleting address: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
    }
}