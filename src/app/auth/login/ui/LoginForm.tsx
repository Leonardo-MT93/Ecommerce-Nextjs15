'use client';
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function LoginForm() {

    const [state, dispatch] = useActionState(authenticate, undefined );
    console.log('🔵 [FORM] Estado actual:', state);
    console.log('🔵 [FORM] Tipo de estado:', typeof state);
    
    return (
        <form action={dispatch} className="flex flex-col">

            <label htmlFor="email">Email</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name="email" />


            <label htmlFor="email">Password</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name="password" />
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {state === 'CredentialsSignin' && (
                    <div className="flex items-center gap-2 mb-2">
                        <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">Invalid credentials</p>
                    </div>
                )}
                {
                    state === 'success' && (
                        <div className="flex items-center gap-2 mb-2">
                            <IoInformationCircleOutline className="h-5 w-5 text-green-500" />
                            <p className="text-sm text-green-500">Login successful</p>
                        </div>
                    )
                }
            </div>
            <LoginButton />


            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Create account
            </Link>

        </form>
    )
}

function LoginButton() {
    const {pending} = useFormStatus();
    return (
        <button
            type="submit"
            className={
                clsx(
                    {
                        'btn-primary': !pending,
                        'btn-disabled': pending
                    }
                )
            }
            disabled={pending}
        >
            {pending ? 'Logging in...' : 'Login'}
        </button>
    )
}
