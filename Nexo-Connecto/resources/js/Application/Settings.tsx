import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    ChevronRight,
    Search,
    Trash2,
    AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { router } from '@inertiajs/react';
import MiniNavbar from './StudentRole/components/MiniNavbar';
import { groupData } from './config/settingsConfig';
import CustomModal from '@/components/Modal';

interface SidebarItemProps {
    id: string;
    icon: React.ElementType;
    title: string;
    isActive: boolean;
    onClick: () => void;
}

const SidebarItem = ({ icon: Icon, title, isActive, onClick }: SidebarItemProps) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
            isActive 
            ? 'bg-white shadow-sm text-gray-900 font-bold' 
            : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
        }`}
    >
        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#CD5656]' : 'text-gray-400 group-hover:text-gray-600'}`} />
        <span className="text-[14px] font-outfit">{title}</span>
    </button>
);

const SettingRow = ({ icon: Icon, title, description, badge }: { icon: any, title: string, description: string, badge?: string }) => (
    <div className="flex items-center justify-between py-6 border-b border-gray-100 last:border-0 group cursor-pointer hover:bg-gray-50/50 px-4 -mx-4 transition-colors rounded-xl">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#CD5656]" />
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <h4 className="text-[15px] font-bold text-gray-900 font-outfit">{title}</h4>
                    {badge && (
                        <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                            {badge}
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-500 font-outfit mt-0.5">{description}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors px-3 py-1.5 hover:bg-white rounded-lg border border-transparent hover:border-gray-100">
                Manage
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-[#CD5656] transition-all group-hover:rotate-90">
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </div>
        </div>
    </div>
);

const Settings = () => {
    const [activeTab, setActiveTab] = useState('career');
    const [searchQuery, setSearchQuery] = useState('');
    const [emphasizedId, setEmphasizedId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const allItems = groupData.flatMap(group => 
        group.items.map(item => ({ ...item, groupId: group.id }))
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        
        if (query.trim() === '') {
            setEmphasizedId(null);
            return;
        }

        const bestMatch = allItems.find(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) || 
            item.description.toLowerCase().includes(query.toLowerCase())
        );

        if (bestMatch) {
            setActiveTab(bestMatch.groupId);
            setEmphasizedId(bestMatch.id);
        } else {
            setEmphasizedId(null);
        }
    };

    const handleDeleteAccount = () => {
        setIsDeleting(true);
        router.delete('/settings/profile', {
            onSuccess: () => {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
            },
            onError: () => {
                setIsDeleting(false);
            },
            onFinish: () => {
                setIsDeleting(false);
            }
        });
    };

    const renderContent = () => {
        const activeGroup = groupData.find(g => g.id === activeTab);
        if (!activeGroup) return null;

        return (
            <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                {activeGroup.items.map((item) => (
                    <div 
                        key={item.id}
                        className={`transition-all duration-500 rounded-2xl ${
                            emphasizedId === item.id 
                            ? 'ring-2 ring-[#CD5656] bg-[#CD5656]/5 shadow-lg shadow-[#CD5656]/10' 
                            : ''
                        }`}
                    >
                        <SettingRow 
                            icon={item.icon} 
                            title={item.title} 
                            description={item.description} 
                            badge={item.badge} 
                        />
                    </div>
                ))}

                {activeTab === 'account' && (
                    <div className="pt-12 mt-12 border-t border-gray-100">
                        <h5 className="text-sm font-bold text-red-900 mb-4 uppercase tracking-widest">Permanent Actions</h5>
                        <button 
                            className="px-6 py-3 bg-[#CD5656]/5 text-[#CD5656] hover:bg-[#CD5656] hover:text-white font-bold rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-2 border border-[#CD5656]/20"
                            onClick={() => setIsDeleteModalOpen(true)} 
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete This Account
                        </button>
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] font-outfit">
            <Head title="Settings" />
            
            <MiniNavbar />

            <main className="max-w-[1400px] mx-auto px-8 md:px-12 py-12">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
                        <p className="text-gray-500 mt-2 text-[15px]">Manage your account settings and preferences.</p>
                    </div>

                    <div className="relative group max-w-md w-full">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#CD5656] transition-colors" />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Type to navigate (e.g. 'password', 'notifications')..."
                                className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-[15px] outline-none shadow-sm focus:border-[#CD5656]/30 focus:ring-4 focus:ring-[#CD5656]/5 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <aside className="lg:col-span-3 space-y-1">
                        {groupData.map((group) => (
                            <SidebarItem 
                                key={group.id}
                                id={group.id}
                                icon={group.icon}
                                title={group.title}
                                isActive={activeTab === group.id}
                                onClick={() => setActiveTab(group.id)}
                            />
                        ))}
                    </aside>
                    <div className="lg:col-span-9 bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100/50">
                        <div className="mb-8 pb-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">
                                {groupData.find(g => g.id === activeTab)?.title}
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">
                                Update and configure your {groupData.find(g => g.id === activeTab)?.title.toLowerCase()}.
                            </p>
                        </div>

                        {renderContent()}
                    </div>
                </div>
            </main>

            <CustomModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)}
                maxWidth="500px"
            >
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 font-outfit">Confirm Account Deletion</h3>
                            <p className="text-sm text-gray-500 font-outfit">This action is permanent and cannot be undone.</p>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8">
                        <p className="text-red-800 font-medium font-outfit text-center">
                            Are You Sure To Perform This Action?
                        </p>
                    </div>

                    <div className="flex items-center gap-3 justify-end">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all active:scale-95"
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-200 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Confirm'}
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export default Settings;


