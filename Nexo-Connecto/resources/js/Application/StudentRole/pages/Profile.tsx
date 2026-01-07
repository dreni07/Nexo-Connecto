import React, { useEffect } from 'react'
import MiniNavbar from '../components/MiniNavbar';
import ProfileHeader from '../components/ProfileHeader';
import UserSkills from '../components/UserSkills';
import PeopleAssociated from '../components/PeopleAssociated';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import StudentLayout from '@/layouts/student-layout';

interface ProfileProps {
    profile_user: {
        id: string;
        name: string;
        email: string;
        avatar: string | null;
        university: string;
        skills: { id: number; skill_name: string }[];
        industry: { id: number; name: string } | null;
    };
    is_own_profile: boolean;
}

const Profile = ({ profile_user, is_own_profile }: ProfileProps) => {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                className: 'font-outfit font-semibold text-sm',
            });
        }
        if (flash?.error) {
            toast.error(flash.error, {
                className: 'font-outfit font-semibold text-sm',
            });
        }
    }, [flash]);

    return (
        <StudentLayout>
            <div className="min-h-screen bg-[#F4F5ED]">
                <Head title={`${profile_user.name}'s Profile`} />
                <MiniNavbar />
                
                <main className="w-full px-2 py-10">
                    <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-6">
                            <ProfileHeader 
                                profile_user={profile_user} 
                                is_own_profile={is_own_profile} 
                            />
                            
                            <UserSkills 
                                skills={profile_user.skills} 
                                industry={profile_user.industry}
                                is_own_profile={is_own_profile} 
                            />
                        </div>

                        <div className="lg:col-span-4">
                            <PeopleAssociated />
                        </div>
                    </div>
                </main>
            </div>
        </StudentLayout>
    )
}

export default Profile;