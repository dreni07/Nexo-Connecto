import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Briefcase, Users } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function CompanyIdentityCard() {
    const { state } = useDashboard();
    const { companyInfo } = state;

    const infoItems = [
        { icon: Building2, label: 'Company', value: companyInfo.name, color: '#CD5656' },
        { icon: Briefcase, label: 'Industry', value: companyInfo.industry, color: '#DA6C6C' },
        { icon: Users, label: 'Employees', value: companyInfo.employees, color: '#AF3E3E' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md font-outfit"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
        >
            <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: '#2A2A2A' }}
            >
                Company Identity
            </h3>
            
            <div className="space-y-3">
                {infoItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="flex items-center gap-3"
                        >
                            <div 
                                className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
                                style={{ backgroundColor: `${item.color}15` }}
                            >
                                <Icon className="w-4 h-4" style={{ color: item.color }} />
                            </div>
                            <div className="flex-1">
                                <span 
                                    className="text-xs block mb-0.5"
                                    style={{ color: 'rgba(0, 0, 0, 0.5)' }}
                                >
                                    {item.label}
                                </span>
                                <span 
                                    className="text-sm font-medium"
                                    style={{ color: '#2A2A2A' }}
                                >
                                    {item.value}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

