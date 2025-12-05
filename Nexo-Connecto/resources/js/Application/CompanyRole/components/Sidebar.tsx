import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    LayoutDashboard, 
    User, 
    Briefcase, 
    Image, 
    Users, 
    Settings,
    HelpCircle,
    MessageCircle,
    BookOpen,
    Mail
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

interface NavItem {
    name: string;
    icon: React.ElementType;
    href: string;
    section: string;
}

interface HelpItem {
    name: string;
    icon: React.ElementType;
    href: string;
}

const navItems: NavItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', section: 'dashboard' },
    { name: 'Profile', icon: User, href: '/company/profile', section: 'profile' },
    { name: 'Opportunities', icon: Briefcase, href: '/company/opportunities', section: 'opportunities' },
    { name: 'Media', icon: Image, href: '/company/media', section: 'media' },
    { name: 'Team', icon: Users, href: '/company/team', section: 'team' },
    { name: 'Settings', icon: Settings, href: '/company/settings', section: 'settings' },
];

const helpItems: HelpItem[] = [
    { name: 'Help Center', icon: HelpCircle, href: '/help' },
    { name: 'Live Chat', icon: MessageCircle, href: '/chat' },
    { name: 'Documentation', icon: BookOpen, href: '/docs' },
    { name: 'Contact Support', icon: Mail, href: '/support' },
];

export default function Sidebar() {
    const { state, setActiveSection } = useDashboard();

    return (
        <aside 
            className="fixed left-0 top-0 h-screen w-64 border-r transition-all duration-300 font-outfit"
            style={{ 
                backgroundColor: '#F8F9F3',
                borderColor: 'rgba(0, 0, 0, 0.08)',
            }}
        >
            <div className="flex h-full flex-col p-6">
                {/* Logo */}
                <div className="mb-8">
                    <Link href="/" className="flex items-center">
                        <span 
                            className="text-2xl font-bold bg-gradient-to-r from-red-dark via-red to-coral bg-clip-text text-transparent"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #AF3E3E, #CD5656, #DA6C6C)',
                            }}
                        >
                            Nexo
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-3">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = state.activeSection === item.section;

                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setActiveSection(item.section)}
                                    className="flex items-center gap-3 rounded-xl px-5 py-4 text-base font-medium transition-all duration-200"
                                    style={{
                                        backgroundColor: isActive 
                                            ? 'rgba(205, 86, 86, 0.1)' 
                                            : 'transparent',
                                        color: isActive ? '#CD5656' : 'rgba(0, 0, 0, 0.7)',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = '#F4F5ED';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-4">
                    <div 
                        className="h-px mb-4"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
                    />
                    <div className="space-y-2">
                        {helpItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200"
                                    style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#F4F5ED';
                                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.8)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)';
                                    }}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
}

