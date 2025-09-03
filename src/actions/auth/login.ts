'use server';
 
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
import prisma from '@/lib/prisma';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
){
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate that both email and password are provided
    if (!email || !password) {
      return 'MissingCredentials';
    }

    // Check if user exists first
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true }
    });

    if (!user) {
      return 'EmailNotFound';
    }

    // Try to authenticate
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return 'Success';
  } catch (error) {
    if(error instanceof AuthError) {
      switch(error.type) {
        case 'CredentialsSignin':
          return 'InvalidPassword';
        case 'CallbackRouteError':
          return 'CallbackError';
        default:
          return 'AuthError';
      }
    }
    return 'AuthError';
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    // Validate that both email and password are provided
    if (!email || !password) {
      return {
        ok: false,
        message: 'Email and password are required.'
      };
    }

    // Check if user exists first
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true }
    });

    if (!user) {
      return {
        ok: false,
        message: 'Email not found. Please check your email address or create a new account.'
      };
    }

    // Authenticate with NextAuth - this will verify the password
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return {
      ok: true,
      message: 'Login successful'
    };
  } catch (error) {
    
    if (error instanceof AuthError) {
      switch(error.type) {
        case 'CredentialsSignin':
          return {
            ok: false,
            message: 'Incorrect password. Please check your password and try again.'
          };
        case 'CallbackRouteError':
          return {
            ok: false,
            message: 'Authentication callback error'
          };
        default:
          return {
            ok: false,
            message: 'Authentication error occurred'
          };
      }
    }
    
    return {
      ok: false,
      message: 'Unexpected error occurred'
    };
  }
}