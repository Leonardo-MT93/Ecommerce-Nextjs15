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
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            
            // Protected routes
            const protectedRoutes = [
                '/profile',
                '/orders',
                '/checkout',
                '/admin'
            ];
            
            // Auth routes
            const authRoutes = [
                '/auth/login',
                '/auth/new-account'
            ];
            
            // Check if the current route requires authentication
            const isProtectedRoute = protectedRoutes.some(route => 
                nextUrl.pathname.startsWith(route)
            );
            
            // Check if the current route is an auth route
            const isAuthRoute = authRoutes.some(route => 
                nextUrl.pathname.startsWith(route)
            );
            
            // If the current route is protected and the user is not logged in, redirect to the login page
            if (isProtectedRoute && !isLoggedIn) {
                const loginUrl = new URL('/auth/login', nextUrl);
                loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
                return Response.redirect(loginUrl);
            }
            
            // If the user is logged in and tries to access an auth route, redirect to the profile page
            if (isAuthRoute && isLoggedIn) {
                return Response.redirect(new URL('/profile', nextUrl));
            }
            
            // Allow access in all other cases
            return true;
        },
        jwt({ token, user }) {
            //security implementations pending
            if (user) {
                token.data = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.data as typeof session.user
            return session;
        }
    }
});

