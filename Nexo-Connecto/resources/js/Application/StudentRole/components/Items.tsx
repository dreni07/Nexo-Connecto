import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const Items = () => {
    const { url } = usePage();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    
    const links = [
        { href: '/student/dashboard', label: 'Home' },
        { href: '/student/companies', label: 'Companies' },
        { href: '/student/feed', label: 'Feed' },
        { href: '/student/problems', label: 'Problems' },
        { href: '/student/projects', label: 'Projects' },
        { href: '/student/preferences', label: 'Preferences' },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
            {links.map((link) => {
                const isActive = url === link.href || url.startsWith(link.href + '/');
                const isHovered = hoveredLink === link.href;
                
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="inline-block font-outfit cursor-pointer transition-opacity duration-200 py-2 lg:py-0"
                        style={{
                            opacity: isActive || isHovered ? 1 : 0.7,
                        }}
                        onMouseEnter={() => setHoveredLink(link.href)}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <span className="text-base lg:text-inherit relative inline-block">
                            {link.label}
                            {isActive && (
                                <span
                                    className="absolute bottom-0 left-0 right-0 h-0.5 lg:h-0.5"
                                    style={{ backgroundColor: '#CD5656' }}
                                />
                            )}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}

export default Items;