import React from 'react';
import { motion } from 'framer-motion';
import TagInput from './TagInput';
import { Sparkles } from 'lucide-react';
import CustomSelect from '../../StudentProfile/components/CustomSelect';

interface Step1Props {
    data: {
        title: string;
        summary: string;
        tags: string[];
        difficulty: string;
        status: string;
    };
    onDataChange: (field: string, value: any) => void;
    onNext: () => void;
}

const Step1GeneralInfo: React.FC<Step1Props> = ({ data, onDataChange, onNext }) => {
    
    const isStepValid = data.title.trim() !== '' && data.summary.trim() !== '' && data.tags.length > 0;

    const statusOptions = [
        { value: 'concept', label: 'Concept' },
        { value: 'prototype', label: 'Prototype' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'beta', label: 'Beta' },
        { value: 'completed', label: 'Completed' },
    ];

    const difficultyOptions = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 font-outfit"
        >
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Project Title</label>
                <div className="relative group">
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => onDataChange('title', e.target.value)}
                        placeholder="Give your project a catchy name..."
                        className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#CD5656] focus:bg-white transition-all text-gray-800 font-bold placeholder:text-gray-300 placeholder:font-normal"
                    />
                    <Sparkles className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200 group-focus-within:text-[#CD5656] transition-colors" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-bold text-gray-700">Short Summary</label>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        {data.summary.length} / 100 characters
                    </span>
                </div>
                <textarea
                    value={data.summary}
                    onChange={(e) => onDataChange('summary', e.target.value)}
                    maxLength={100}
                    placeholder="Translate your vision into words that captivate the world's attention..."
                    className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#CD5656] min-h-[100px] transition-all text-gray-700 resize-none leading-relaxed placeholder:italic placeholder:text-gray-300"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Project Tags</label>
                <TagInput 
                    tags={data.tags} 
                    onTagsChange={(newTags) => onDataChange('tags', newTags)} 
                    placeholder="e.g. React, UI/UX, AI, Laravel..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <CustomSelect
                        label="Development Status"
                        options={statusOptions}
                        selectedValue={data.status}
                        onValueChange={(value) => onDataChange('status', value)}
                        placeholder="Select status"
                    />
                </div>

                <div className="space-y-2">
                    <CustomSelect
                        label="Difficulty Level"
                        options={difficultyOptions}
                        selectedValue={data.difficulty}
                        onValueChange={(value) => onDataChange('difficulty', value)}
                        placeholder="Select difficulty"
                    />
                </div>
            </div>

            <div className="pt-8 flex justify-end">
                <button
                    onClick={onNext}
                    disabled={!isStepValid}
                    className="px-12 py-4 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#B44B4B] disabled:bg-gray-200 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#CD5656]/20 active:scale-95"
                >
                    Continue to Visuals
                </button>
            </div>
        </motion.div>
    );
};

export default Step1GeneralInfo;

