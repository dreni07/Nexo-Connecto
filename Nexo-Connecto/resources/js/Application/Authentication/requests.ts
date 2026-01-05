import { router } from '@inertiajs/react';

import type { 
    CreateCompanyAccountRequest, 
    CreateCompanyAccountResponse,
    VerifyCodeRequest,
    RegisterRequest,
    LoginRequest
} from './types';

interface ApiResponse {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    error?: string;
    hasProfile?: boolean;
    user?: {
        id: number;
        email: string;
        email_verified_at?: string | null;
        role?: string | null;
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

    console.log(token,"TOKEN FROM HTML")
   
    if (token) return token;
    
    const cookieToken = fallbackCsrfToken();
    return cookieToken || null;
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

export const verifyCode = async (verify_code:VerifyCodeRequest):Promise<ApiResponse> => {
    try {
        const csrfToken = getCsrfToken();

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken ?? ''
            },
            body: JSON.stringify(verify_code),
            credentials: 'same-origin'
        };

        const response = await fetch('/verify/verify-code', options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to verify code. Please try again.');
        }

        const result: ApiResponse = await response.json();

        if (!result.success) {
            throw new Error(result.error || result.message || 'Failed to verify code. Please try again.');
        }

        return result;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to verify code. Please try again.';
        throw new Error(errorMessage);
    }
}


export const handleRequest = async ():Promise<ApiResponse> => {
    try {
        const csrfToken = getCsrfToken();

        console.log(csrfToken,"CSRF TOKEN");


        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken ?? ''
            },
            body: JSON.stringify({}),
            credentials: 'same-origin'
        };

        const response = await fetch('/verify/handle-request', options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to handle request. Please try again.');
        }

        const result: ApiResponse = await response.json();

        return result;
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to handle request. Please try again.';
        throw new Error(errorMessage);
    }
}

export const register = async (data: RegisterRequest): Promise<ApiResponse> => {
    try {
        const csrfToken = getCsrfToken();

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken ?? ''
            },
            body: JSON.stringify(data),
            credentials: 'same-origin'
        };

        const response = await fetch('/register', options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register. Please try again.');
        }

        const result: ApiResponse = await response.json();

        if (!result.success) {
            let errorMessage = result.error || result.message || 'Failed to register. Please try again.';
            
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
            
            throw new Error(errorMessage);
        }

        return result;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to register. Please try again.';
        throw new Error(errorMessage);
    }
};

export const login = async (data: LoginRequest): Promise<ApiResponse> => {
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

        const options: RequestInit = {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
            credentials: 'same-origin'
        };

        const response = await fetch('/login', options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to sign in. Please try again.');
        }

        const result: ApiResponse = await response.json();

        if (!result.success) {
            let errorMessage = result.error || result.message || 'Failed to sign in. Please try again.';
            
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
            
            throw new Error(errorMessage);
        }

        return result;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to sign in. Please try again.';
        throw new Error(errorMessage);
    }
};

