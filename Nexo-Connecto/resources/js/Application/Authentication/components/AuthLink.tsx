import React from 'react';
import { Link } from '@inertiajs/react';

export enum Action {
    Register = 'Register',
    SignIn = 'SignIn',
}

interface AuthLinkProps {
    action: Action;
    navigateTo: string;
}

export default function AuthLink({ action, navigateTo }: AuthLinkProps) {
    const getContent = () => {
        if (action === Action.Register) {
            return {
                prefix: 'Already have an account? ',
                linkText: 'Sign In',
            };
        }
        return {
            prefix: "Don't Have An Account? ",
            linkText: 'Sign Up',
        };
    };

    const { prefix, linkText } = getContent();

    return (
        <div className="text-center mt-4">
            <span className="text-sm text-foreground font-outfit">
                {prefix}
                <Link
                    href={navigateTo}
                    className="font-bold hover:opacity-80 transition-opacity font-outfit"
                    style={{ color: '#CD5656' }}
                >
                    {linkText}
                </Link>
            </span>
        </div>
    );
}

