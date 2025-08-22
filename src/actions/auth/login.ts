'use server';
 
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
){
  try {
    const callbackUrl = formData.get('callbackUrl') as string || '/';

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return 'Success';
  } catch (error) {
    if(error instanceof AuthError) {
      switch(error.type) {
        case 'CredentialsSignin':
          return 'CredentialsSignin';
        default:
          return 'AuthError';
      }
    }
    return 'AuthError';
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return {
      ok: true,
      message: 'Login successful'
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error logging in'
    }
  }
}