import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, UserPlus, Search, BarChart3, FileText } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface QuickAction {
    icon: React.ElementType;
    label: string;
    href: string;
    color: string;
}

const quickActions: QuickAction[] = [
    { icon: Plus, label: 'Post Opportunity', href: '/company/opportunities/create', color: '#CD5656' },
    { icon: Edit, label: 'Edit Profile', href: '/company/profile', color: '#DA6C6C' },
    { icon: UserPlus, label: 'Invite Team', href: '/company/team/invite', color: '#AF3E3E' },
    { icon: Search, label: 'View Matches', href: '/company/matches', color: '#CD5656' },
    { icon: BarChart3, label: 'View Analytics', href: '/company/analytics', color: '#DA6C6C' },
    { icon: FileText, label: 'Applications', href: '/company/applications', color: '#AF3E3E' },
];

export default function QuickActionsBar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl p-6 shadow-sm font-outfit h-full w-full"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
        >
            <div className="flex flex-col justify-between gap-2 h-full">
                {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    const isLast = index === quickActions.length - 1;
                    return (
                        <React.Fragment key={action.label}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.15 + index * 0.05 }}
                            >
                                <Link
                                    href={action.href}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                                    style={{
                                        backgroundColor: `${action.color}15`,
                                        color: action.color,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = `${action.color}25`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = `${action.color}15`;
                                    }}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{action.label}</span>
                                </Link>
                            </motion.div>
                            {!isLast && (
                                <div 
                                    className="w-full h-px"
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </motion.div>
    );
}

