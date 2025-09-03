'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
    const session = await auth();
    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: "Unauthorized",
        }
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        return {
            ok: true,
            users,
            message: "Users fetched successfully",
        }
    } catch (error) {
        return {
            ok: false,
            message: "Error fetching users",
        }
    }
}