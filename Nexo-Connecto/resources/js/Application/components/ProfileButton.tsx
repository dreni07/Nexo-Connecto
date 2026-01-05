import React, { useState } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { Link } from '@inertiajs/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import defaultAvatar from '../assets/default-avatar.jpg';

interface ProfileButtonProps {
    avatar?: string | null;
    className?: string;
}

export default function ProfileButton({ 
    avatar,
    className = '' 
}: ProfileButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const avatarSrc = avatar || defaultAvatar;

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    type="button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 active:scale-95 overflow-hidden cursor-pointer ${className}`}
                    style={{
                        backgroundColor: isHovered ? '#F8F9F3' : '#FFFFFF',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    }}
                    aria-label="Profile menu"
                >
                    <img
                        src={avatarSrc}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[200px] bg-white rounded-lg shadow-lg p-1 z-50"
                    style={{
                        boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
                        animation: 'dropdownFadeIn 0.2s ease-out',
                    }}
                    sideOffset={5}
                    align="end"
                >
                    <style>{`
                        @keyframes dropdownFadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(-8px) scale(0.95);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }
                    `}</style>
                    <DropdownMenu.Item asChild>
                        <Link
                            href="/student/profile"
                            className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer outline-none font-outfit"
                            style={{
                                color: '#333',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#F8F9F3';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <User className="w-4 h-4" style={{ color: '#CD5656' }} />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item asChild>
                        <Link
                            href="/student/settings"
                            className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer outline-none font-outfit"
                            style={{
                                color: '#333',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#F8F9F3';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <Settings className="w-4 h-4" style={{ color: '#CD5656' }} />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />

                    <DropdownMenu.Item asChild>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer outline-none font-outfit"
                            style={{
                                color: '#333',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#F8F9F3';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <LogOut className="w-4 h-4" style={{ color: '#CD5656' }} />
                            <span>Logout</span>
                        </Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

