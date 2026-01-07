import React, { useState, useEffect } from 'react';
import CustomModal from '@/components/Modal';
import CustomSelect from '../StudentProfile/components/CustomSelect';
import { X, Plus, Search, Loader2 } from 'lucide-react';
import { 
    fetchIndustries, 
    fetchTechnicalSkills, 
    updateStudentSkills,
    type Industry,
    type Skill 
} from '../requests';

import SkillTag from './SkillTag';

interface AddSkillsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentSkills: { id: number; skill_name: string }[];
    currentIndustryId: number | null;
}

export default function AddSkillsModal({ isOpen, onClose, currentSkills, currentIndustryId }: AddSkillsModalProps) {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [selectedIndustry, setSelectedIndustry] = useState<number | null>(currentIndustryId);
    const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>(currentSkills);
    const [isLoadingIndustries, setIsLoadingIndustries] = useState(false);
    const [isLoadingSkills, setIsLoadingSkills] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadIndustries();
            setSelectedSkills(currentSkills);
            setSelectedIndustry(currentIndustryId);
        }
    }, [isOpen]);

    useEffect(() => {
        if (selectedIndustry) {
            loadSkills(selectedIndustry);
        } else {
            setAvailableSkills([]);
        }
    }, [selectedIndustry]);

    const loadIndustries = async () => {
        setIsLoadingIndustries(true);
        try {
            const data = await fetchIndustries();
            setIndustries(data);
        } catch (error) {
            console.error('Error fetching industries:', error);
        } finally {
            setIsLoadingIndustries(false);
        }
    };

    const loadSkills = async (industryId: number) => {
        setIsLoadingSkills(true);
        try {
            const data = await fetchTechnicalSkills(industryId);
            setAvailableSkills(data);
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setIsLoadingSkills(false);
        }
    };

    const handleSelectSkill = (skill: Skill) => {
        if (selectedSkills.length >= 10) {
            return;
        }
        if (!selectedSkills.find(s => s.id === skill.id)) {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleRemoveSkill = (skillId: number) => {
        setSelectedSkills(selectedSkills.filter(s => s.id !== skillId));
    };

    const handleSave = () => {
        setIsSaving(true);
        updateStudentSkills(
            selectedSkills.map(s => s.id),
            () => {
                setIsSaving(false);
                onClose();
            },
            () => {
                setIsSaving(false);
            }
        );
    };

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Technical Skills"
            maxWidth="850px"
            className="modal-content !bg-[#F4F5ED]"
        >
            <div className="flex flex-col gap-10 font-outfit py-4 px-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#CD5656] text-white text-xs">1</span>
                            Select Industry
                        </label>
                        <CustomSelect
                            options={industries.map(i => ({ value: i.id, label: i.industry_name }))}
                            selectedValue={selectedIndustry}
                            onValueChange={(val: string | number | null) => {
                                setSelectedIndustry(val as number);
                                setSelectedSkills([]);
                            }}
                            placeholder={isLoadingIndustries ? "Loading industries..." : "Choose an industry"}
                            searchable={true}
                        />
                        <p className="text-[11px] text-gray-500 pl-8">
                            Choose the industry that best matches your expertise.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#CD5656] text-white text-xs">2</span>
                            Select Skills (Max 10)
                        </label>
                        <div className="relative">
                            <CustomSelect
                                options={availableSkills
                                    .filter(skill => !selectedSkills.find(s => s.id === skill.id))
                                    .map(s => ({ value: s.id, label: s.skill_name }))}
                                selectedValue={null}
                                onValueChange={(val: string | number | null) => {
                                    const skill = availableSkills.find(s => s.id === val);
                                    if (skill) handleSelectSkill(skill);
                                }}
                                placeholder={!selectedIndustry ? "Select an industry first" : (isLoadingSkills ? "Loading skills..." : "Search and select skills")}
                                searchable={true}
                                disabled={!selectedIndustry || isLoadingSkills}
                            />
                            {isLoadingSkills && (
                                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                                    <Loader2 className="w-4 h-4 animate-spin text-[#CD5656]" />
                                </div>
                            )}
                        </div>
                        <p className="text-[11px] text-gray-500 pl-8">
                            Select up to 10 specific technical skills.
                        </p>
                    </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-200/60">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-bold text-gray-800 tracking-tight">Your Selections</label>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                {selectedSkills.length}/10
                            </span>
                        </div>
                        {selectedSkills.length > 0 && (
                            <button 
                                onClick={() => setSelectedSkills([])}
                                className="text-[11px] font-bold text-[#CD5656] hover:underline"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 min-h-[120px] p-6 bg-white/40 rounded-2xl border-2 border-dashed border-gray-200 transition-colors hover:border-[#CD5656]/20">
                        {selectedSkills.length === 0 ? (
                            <div className="w-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                <Search className="w-6 h-6 opacity-20" />
                                <span className="text-xs font-medium italic">Your selected skills will appear here</span>
                            </div>
                        ) : (
                            selectedSkills.map((skill) => (
                                <SkillTag
                                    key={skill.id}
                                    name={skill.skill_name}
                                    showRemove={true}
                                    onRemove={() => handleRemoveSkill(skill.id)}
                                    className="animate-in fade-in zoom-in duration-200"
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={selectedSkills.length === 0 || isSaving}
                        className="flex items-center gap-2 px-10 py-3 bg-[#CD5656] cursor-pointer text-white font-bold rounded-xl hover:bg-[#B04444] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm shadow-lg shadow-[#CD5656]/20 active:scale-95"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Saving Expertise...</span>
                            </>
                        ) : (
                            <span>Save Skills</span>
                        )}
                    </button>
                </div>
            </div>
        </CustomModal>
    );
}

