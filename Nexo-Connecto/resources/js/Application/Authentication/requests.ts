import { router } from '@inertiajs/react';

import type { 
    CreateCompanyAccountRequest, 
    CreateCompanyAccountResponse 
} from './types';

interface ApiResponse {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    error?: string;
    user?: {
        id: number;
        email: string;
    };
}

const fallbackCsrfToken = (): string => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name,value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN') {
            return decodeURIComponent(value);
        }
    }
    return '';
}

const getCsrfToken = (): string | null => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
   
    if (token) return token;
    
    // try an fallback through cookies if we cannot find the csrf token 
    
    return fallbackCsrfToken();

    return null;
};

export const createCompanyAccount = async (
    data: CreateCompanyAccountRequest,
    options?: {
        onSuccess?: (response: CreateCompanyAccountResponse) => void;
        onError?: (message: string) => void;
        onFinish?: () => void;
        preserveScroll?: boolean;
    }
): Promise<void> => {
    try {
        const csrfToken = getCsrfToken();
        
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
        };
        
        if (csrfToken) {
            headers['X-CSRF-TOKEN'] = csrfToken;
        }

        const response = await fetch('/company/register', {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
            credentials: 'same-origin',
        });

        const result: ApiResponse = await response.json();

        if (!result.success) {
            let errorMessage = result.error || result.message || 'An error occurred';
            
            if (result.errors) {
                const errorKeys = Object.keys(result.errors);
                if (errorKeys.length > 0) {
                    const firstErrorKey = errorKeys[0];

                    const firstError = Array.isArray(result.errors[firstErrorKey]) 
                        ? result.errors[firstErrorKey][0] 
                        : result.errors[firstErrorKey];
                    errorMessage = firstError || errorMessage;
                }
            }
            
            options?.onError?.(errorMessage);
            options?.onFinish?.();
            return;
        }

        const responseData: CreateCompanyAccountResponse = {
            message: result.message,
            user: result.user,
        };
        
        options?.onSuccess?.(responseData);
        
        router.visit('/dashboard', {
            method: 'get',
            preserveScroll: options?.preserveScroll ?? true,
        });
        
        options?.onFinish?.();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create account. Please try again.';
        options?.onError?.(errorMessage);
        options?.onFinish?.();
    }
};

