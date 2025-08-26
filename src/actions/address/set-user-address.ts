"use server"
import { PrismaClient } from "@prisma/client"
import { Address } from "@/interfaces"
import prisma from "@/lib/prisma"


export const setUserAddress = async (address: Address, userId: string) => {
    try {
        const newAddress = await createOrReplaceAddress(address, userId)
        return {
            ok: true,
            address: newAddress
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error setting user address')
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const existingAddress = await prisma.userAddress.findUnique({
            where: { userId }
        })

        const addressToSave = {
            userId,
            name: address.name,
            lastName: address.lastName,
            phone: address.phone,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            city: address.city,
            countryId: address.country,
        }

        if (!existingAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            })
            return newAddress
        }

        const updatedAddress = await prisma.userAddress.update({
            where: { userId },
            data: addressToSave
        })
        return updatedAddress
    } catch (error) {
        console.log(error)
        throw new Error('Error creating or replacing address')
    }
}