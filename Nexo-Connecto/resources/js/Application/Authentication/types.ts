export interface CreateCompanyAccountRequest {
    email: string;
    password: string;
}

export interface CreateCompanyAccountResponse {
    message?: string;
    user?: {
        id: number;
        email: string;
    };
}


export interface ApiErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

export type VerifyCodeRequest =
{
    code: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    role: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}


