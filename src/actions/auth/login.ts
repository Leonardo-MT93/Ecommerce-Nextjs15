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

    await signIn('credentials', formData);
    console.log('🔵 [AUTH] signIn completado exitosamente');
    return 'success';
  } catch (error) {
    console.log('🔴 [AUTH] Error capturado:', error);
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.';
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }
    // throw error;
    return 'CredentialsSignin';
  }
}