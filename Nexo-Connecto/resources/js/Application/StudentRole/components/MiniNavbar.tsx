import React from 'react';
import NexoLogo from '@/components/NexoLogo';
import { usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import NotificationButton from '../../components/NotificationButton';
import ProfileButton from '../../components/ProfileButton';
import Items from './Items';

const MiniNavbar = () => {
    const { props } = usePage();
    const user = (props.auth as any)?.user;

    return (
        <nav className="w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <NexoLogo size="sm" font="outfit" />
                <div className="h-6 w-px bg-gray-200 hidden md:block" />
            </div>

            <div className="flex items-center">
                <Items />
            </div>

            <div className="flex items-center gap-5">
                <NotificationButton 
                    onClick={() => console.log('Notifications clicked')}
                    hasNotifications={false}
                    className="!w-8 !h-8 !shadow-none !bg-transparent hover:!bg-gray-50"
                />

                <div className="flex items-center pl-4 border-l border-gray-100">
                    <ProfileButton avatar={user?.avatar} className="!w-9 !h-9 !shadow-none border border-gray-100" />
                </div>
            </div>
        </nav>
    );
};

export default MiniNavbar;
