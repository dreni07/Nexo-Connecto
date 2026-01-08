import React, { useState } from 'react';
import { Info, Plus } from 'lucide-react';
import AddSkillsModal from './AddSkillsModal';
import SkillTag from './SkillTag';

interface Skill {
    id: number;
    skill_name: string;
}

interface UserSkillsProps {
    skills: Skill[];
    industry: { id: number; name: string } | null;
    is_own_profile: boolean;
}

const UserSkills = ({ skills, industry, is_own_profile }: UserSkillsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasSkills = skills && skills.length > 0;

    return (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 relative min-h-[300px] sm:min-h-[350px] lg:min-h-[405px]">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-4 sm:mb-5 lg:mb-6">
                <h2 className="text-lg sm:text-xl font-bold font-outfit text-gray-900">Skills</h2>
                
                {is_own_profile && !hasSkills && (
                    <div className="flex items-center gap-2 bg-[#F8F9F3] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#CD5656]/20 w-full sm:w-auto">
                        <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#CD5656] flex-shrink-0" />
                        <span className="text-[10px] sm:text-[11px] font-medium text-gray-600 font-outfit">
                            Adding your technical skills helps you land an internship by 25%
                        </span>
                    </div>
                )}
            </div>

            {hasSkills ? (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {skills.map((skill) => (
                        <SkillTag 
                            key={skill.id} 
                            name={skill.skill_name} 
                        />
                    ))}
                    {is_own_profile && (
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-3 sm:px-4 h-9 sm:h-10 bg-[#F8F9F3] border border-dashed border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-500 font-outfit hover:border-[#CD5656]/50 hover:text-[#CD5656] transition-all cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>Add New</span>
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8 sm:py-10 gap-3 sm:gap-4">
                    {is_own_profile ? (
                        <>
                            <p className="text-xs sm:text-sm text-gray-500 font-outfit text-center max-w-xs px-4">
                                Showcase your technical expertise to potential employers.
                            </p>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#CD5656] text-white font-semibold rounded-lg hover:bg-[#B04444] transition-all font-outfit text-xs sm:text-sm shadow-md cursor-pointer active:scale-95"
                            >
                                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>Add Technical Skills</span>
                            </button>
                        </>
                    ) : (
                        <p className="text-xs sm:text-sm text-gray-500 font-outfit italic">
                            No skills listed yet.
                        </p>
                    )}
                </div>
            )}

            <AddSkillsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentSkills={skills}
                currentIndustryId={industry?.id ?? null}
            />
        </div>
    );
};

export default UserSkills;

