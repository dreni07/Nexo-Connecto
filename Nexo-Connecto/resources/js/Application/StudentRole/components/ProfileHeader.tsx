import React, { useRef } from 'react';
import { Mail, GraduationCap, MoreVertical, Camera } from 'lucide-react';
import { router } from '@inertiajs/react';

interface ProfileHeaderProps {
    profile_user: {
        id: string;
        name: string;
        email: string;
        avatar: string | null;
        university: string;
    };
    is_own_profile: boolean;
}

const ProfileHeader = ({ profile_user, is_own_profile }: ProfileHeaderProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        if (is_own_profile) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);

            router.post('/student/profile/update-avatar', formData, {
                forceFormData: true,
                onSuccess: () => {
                    console.log('Avatar updated successfully');
                },
            });
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-48 w-full bg-gradient-to-r from-[#CD5656] via-[#E28282] to-[#FCE8E8]" />
            
            <div className="relative px-8 pb-10">
                <div className="relative -mt-20 mb-6 inline-block">
                    <div 
                        className={`w-40 h-40 rounded-full border-[6px] border-white shadow-md overflow-hidden bg-gray-50 relative group ${is_own_profile ? 'cursor-pointer' : ''}`}
                        onClick={handleAvatarClick}
                    >
                        {profile_user.avatar ? (
                            <img 
                                src={`/storage/${profile_user.avatar}`} 
                                alt={profile_user.name} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        )}

                        {is_own_profile && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        )}
                        
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            accept="image/*" 
                            className="hidden" 
                        />
                    </div>
                </div>

                <div className="absolute top-6 right-8">
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
                        <MoreVertical className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold font-outfit text-gray-900 tracking-tight">
                            {profile_user.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 text-gray-600 font-outfit">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#CD5656]" />
                            <span className="text-sm font-medium">{profile_user.email}</span>
                        </div>
                        <div className="w-[10px] h-[10px] rounded-full bg-gray-300" />
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-[#CD5656]" />
                            <span className="text-sm font-medium">{profile_user.university}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        {is_own_profile ? (
                            <button className="px-6 py-2.5 bg-white border border-gray-200 cursor-pointer text-gray-700 font-semibold rounded-lg hover:bg-[#F8F9F3] hover:border-[#CD5656]/30 hover:text-[#CD5656] transition-all duration-300 font-outfit text-sm shadow-sm active:scale-95">
                                Edit
                            </button>
                        ) : (
                            <>
                                <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all font-outfit text-sm shadow-sm cursor-pointer active:scale-95">
                                    Message
                                </button>
                                <button className="px-6 py-2.5 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1E40AF] transition-all font-outfit text-sm shadow-sm cursor-pointer active:scale-95">
                                    Peer Comparison
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;

