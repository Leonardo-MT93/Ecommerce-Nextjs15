import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // }),
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                const user = await prisma.user.findUnique({
                    where: { email: email.toLowerCase() }
                });

                if (!user) return null;

                if (!bcrypt.compareSync(password, user.password)) return null;

                const { password: _, ...userData } = user;

                return userData;
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.data as any
            return session;
        }
    }
});

