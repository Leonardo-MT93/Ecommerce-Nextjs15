'use client';

import { loginUser, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";



type MessageType = 'error' | 'success' | 'loading';

interface MessageState {
    type: MessageType;
    text: string;
}

export const RegisterForm = () => {

    const [message, setMessage] = useState<MessageState | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    
    const { fullName, email, password } = formData;

    const showMessage = (type: MessageType, text: string) => {
        setMessage({ type, text });
        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => setMessage(null), 3000);
        }
    };

    // Function to clear specific field errors when user starts typing
    const clearFieldError = (fieldName: string) => {
        if (hasSubmitted && message?.type === 'error' && message.text.includes('Please fill in the following')) {
            // Check if the specific field now has content
            let fieldHasContent = false;
            switch (fieldName) {
                case 'fullName':
                    fieldHasContent = fullName.trim().length > 0;
                    break;
                case 'email':
                    fieldHasContent = email.trim().length > 0;
                    break;
                case 'password':
                    fieldHasContent = password.trim().length > 0;
                    break;
            }
            
            // If this field now has content, update the error message
            if (fieldHasContent) {
                const emptyFields = [];
                if (!fullName.trim()) emptyFields.push('Full Name');
                if (!email.trim()) emptyFields.push('Email');
                if (!password.trim()) emptyFields.push('Password');
                
                if (emptyFields.length === 0) {
                    setMessage(null);
                    setHasSubmitted(false);
                } else {
                    const fieldText = emptyFields.length === 1 ? 'field' : 'fields';
                    showMessage('error', `Please fill in the following ${fieldText}: ${emptyFields.join(', ')}.`);
                }
            }
        }
    };

    // Password validation function
    const validatePassword = (password: string) => {
        const errors = [];
        if (password.length < 6) errors.push('at least 6 characters');
        if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
        if (!/[0-9]/.test(password)) errors.push('one number');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('one special character');
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null); // Clear previous messages
        setHasSubmitted(true);

        try {
            // Check which fields are empty and show specific errors
            const emptyFields = [];
            if (!fullName.trim()) emptyFields.push('Full Name');
            if (!email.trim()) emptyFields.push('Email');
            if (!password.trim()) emptyFields.push('Password');
            
            if (emptyFields.length > 0) {
                const fieldText = emptyFields.length === 1 ? 'field' : 'fields';
                showMessage('error', `Please fill in the following ${fieldText}: ${emptyFields.join(', ')}.`);
                return;
            }

            // Validate password
            const passwordErrors = validatePassword(password);
            if (passwordErrors.length > 0) {
                showMessage('error', `Password must contain: ${passwordErrors.join(', ')}.`);
                return;
            }
            
            // Register user
            const response = await registerUser(fullName, email, password);
            
            if (!response.ok) {
                showMessage('error', response.message);
                return;
            }

            showMessage('success', 'Account created successfully! Redirecting...');
            
            // Auto login after successful registration
            await loginUser(email.toLowerCase(), password);
            window.location.replace('/');
            
        } catch (error) {
            showMessage('error', 'Unexpected error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // Handle input changes
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        clearFieldError(field);
    };

    // Clear error messages when user starts typing in empty fields
    useEffect(() => {
        if (hasSubmitted && message?.type === 'error') {
            // Check if the error message is about empty fields
            if (message.text.includes('Please fill in the following')) {
                // Check if all previously empty fields now have content
                const allFieldsFilled = fullName.trim() && email.trim() && password.trim();
                
                if (allFieldsFilled) {
                    setMessage(null);
                    setHasSubmitted(false);
                }
            }
        }
    }, [fullName, email, password, hasSubmitted, message]);

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>


            <label htmlFor="fullName">Full Name</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                autoFocus={true}
                value={fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                type="text" />

            <label htmlFor="email">Email</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                type="email" />

            <label htmlFor="password">Password</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-2"
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                type="password" />
            
            {/* Password requirements display */}
            <div className="text-xs text-gray-600 mb-4">
                <p className="font-medium mb-1">Password requirements:</p>
                <ul className="space-y-1">
                    <li className={password.length >= 6 ? 'text-green-600' : 'text-gray-500'}>
                        ✓ At least 6 characters
                    </li>
                    <li className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                        ✓ One uppercase letter
                    </li>
                    <li className={/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                        ✓ One number
                    </li>
                    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                        ✓ One special character
                    </li>
                </ul>
            </div>

            {/* Message display area - always takes space */}
            <div className="min-h-[2rem] mb-4" aria-live="polite" aria-atomic="true">
                {message && (
                    <div className={`flex items-start gap-2 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        <IoInformationCircleOutline className={`h-5 w-5 mt-0.5 flex-shrink-0 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`} />
                        <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                    'btn-primary',
                    {
                        'btn-disabled': isLoading
                    }
                )}>
                {isLoading ? 'Creando cuenta...' : 'Create account'}
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Back to login
            </Link>

        </form>
    )
}