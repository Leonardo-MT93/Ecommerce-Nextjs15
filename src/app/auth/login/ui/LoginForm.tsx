'use client';
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState, startTransition } from "react";
import { useFormStatus } from "react-dom";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function LoginForm() {

    const [state, dispatch] = useActionState(authenticate, undefined );
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [validationError, setValidationError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    

    useEffect(() => {
        if (state === 'Success') {
            window.location.replace(callbackUrl);
        }
    }, [state, callbackUrl]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);
        
        // Validate fields before submitting
        if (!formData.email.trim() || !formData.password.trim()) {
            setValidationError('Please enter both email and password.');
            return;
        }
        
        // Create FormData and submit
        const form = new FormData();
        form.append('email', formData.email);
        form.append('password', formData.password);
        form.append('callbackUrl', callbackUrl);
        
        startTransition(() => {
            dispatch(form);
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev: { email: string; password: string }) => ({ ...prev, [field]: value }));
        // Clear validation error when user starts typing
        if (validationError) {
            setValidationError(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">

            <label htmlFor="email">Email</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                autoFocus={true} />

            <label htmlFor="password">Password</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)} />
            {/* Message display area - always takes space */}
            <div className="min-h-[2rem] mb-4" aria-live="polite" aria-atomic="true">
                {validationError && (
                    <div className="flex items-start gap-2 text-red-500">
                        <IoInformationCircleOutline className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-500" />
                        <p className="text-sm leading-relaxed">{validationError}</p>
                    </div>
                )}
                {state === 'MissingCredentials' && (
                    <div className="flex items-start gap-2 text-red-500">
                        <IoInformationCircleOutline className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-500" />
                        <p className="text-sm leading-relaxed">Please enter both email and password.</p>
                    </div>
                )}
                {state === 'EmailNotFound' && (
                    <div className="flex items-start gap-2 text-red-500">
                        <IoInformationCircleOutline className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-500" />
                        <p className="text-sm leading-relaxed">Email not found. Please check your email address or create a new account.</p>
                    </div>
                )}
                {state === 'InvalidPassword' && (
                    <div className="flex items-start gap-2 text-red-500">
                        <IoInformationCircleOutline className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-500" />
                        <p className="text-sm leading-relaxed">Incorrect password. Please check your password and try again.</p>
                    </div>
                )}
                {state === 'CallbackError' && (
                    <div className="flex items-start gap-2 text-red-500">
                        <IoInformationCircleOutline className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-500" />
                        <p className="text-sm leading-relaxed">Authentication callback error. Please try again.</p>
                    </div>
                )}
                {state === 'AuthError' && (
                    <div className="flex items-start gap-2 text-red-500">
                        <IoInformationCircleOutline className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-500" />
                        <p className="text-sm leading-relaxed">Authentication error occurred. Please try again later.</p>
                    </div>
                )}
                {state === 'Success' && (
                    <div className="flex items-start gap-2 text-green-500">
                        <IoInformationCircleOutline className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-500" />
                        <p className="text-sm leading-relaxed">Login successful! Redirecting...</p>
                    </div>
                )}
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
