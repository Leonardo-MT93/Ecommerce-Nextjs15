'use server';

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (fullName: string, email: string, password: string) => {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return {
                ok: false,
                message: 'This email is already registered. Please try with a different email.'
            };
        }

        const user = await prisma.user.create({
            data: {
                name: fullName,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password, 10)
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        return {
            ok: true,
            user,
            message: 'User registered successfully'
        };
    } catch (error: unknown) {
        
        // Handle specific Prisma errors
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return {
                ok: false,
                message: 'This email is already registered. Please try with a different email.'
            };
        }
        
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
            return {
                ok: false,
                message: 'Invalid data. Please check the information provided.'
            };
        }

        return {
            ok: false,
            message: 'Error creating account. Please try again.'
        };
    }
}