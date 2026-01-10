import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Rocket, Loader2 } from 'lucide-react';

interface Step4Props {
    data: {
        learningQuestions: Record<string, string>;
    };
    onDataChange: (field: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
    loading?: boolean;
}

const Step4Growth: React.FC<Step4Props> = ({ data, onDataChange, onNext, onBack, loading }) => {
    
    const questions = [
        {
            id: 'new_skills',
            label: 'New Skills Gained/Learned',
            icon: Sparkles,
            placeholder: 'What new tools, libraries, or methodologies did you pick up? Maybe you mastered a new CSS framework, or finally understood how to use WebSockets...'
        },
        {
            id: 'concepts_reinforced',
            label: 'Concepts Reinforced',
            icon: BookOpen,
            placeholder: 'Building is the best way to learn. What existing knowledge did this project solidify? (e.g., State management, API design, Database normalization...)'
        },
        {
            id: 'next_steps',
            label: 'Next Steps & Growth',
            icon: Rocket,
            placeholder: 'A project is never truly finished. How do you plan to evolve this? New features? Scaling? Refactoring? Tell us your vision for its future...'
        }
    ];

    const handleQuestionChange = (id: string, value: string) => {
        onDataChange('learningQuestions', {
            ...data.learningQuestions,
            [id]: value
        });
    };

    const isStepValid = questions.every(q => data.learningQuestions[q.id]?.trim().length > 10);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10 font-outfit"
        >
            <div className="space-y-12">
                {questions.map((q) => (
                    <div key={q.id} className="space-y-4">
                        <div className="flex items-center gap-3 ml-1">
                            <div className="w-8 h-8 rounded-xl bg-[#CD5656]/5 flex items-center justify-center">
                                <q.icon className="w-4 h-4 text-[#CD5656]" />
                            </div>
                            <label className="text-base font-bold text-gray-800">{q.label}</label>
                        </div>
                        
                        <div className="relative group">
                            <textarea
                                value={data.learningQuestions[q.id] || ''}
                                onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                                placeholder={q.placeholder}
                                className="w-full min-h-[180px] p-6 bg-white border-2 border-gray-100 rounded-[24px] outline-none focus:border-[#CD5656] focus:bg-white transition-all text-gray-700 leading-relaxed placeholder:italic placeholder:text-gray-300 shadow-sm"
                            />
                            <div className="absolute bottom-4 right-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest pointer-events-none">
                                {(data.learningQuestions[q.id] || '').length} chars
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8 flex justify-between items-center">
                <button
                    onClick={onBack}
                    className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                >
                    Go Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!isStepValid || loading}
                    className="px-12 py-4 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#B44B4B] disabled:bg-gray-200 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#CD5656]/20 active:scale-95 flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Creating Project...</span>
                        </>
                    ) : (
                        'Complete Project'
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default Step4Growth;

