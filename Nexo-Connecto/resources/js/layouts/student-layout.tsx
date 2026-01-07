import CoinIntroduction from '@/components/CoinIntroduction';
import { type ReactNode } from 'react';

interface StudentLayoutProps {
    children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
    return (
        <div className="min-h-screen">
            {children}
            <CoinIntroduction />
        </div>
    );
}

