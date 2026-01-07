import React, { useState, useEffect } from 'react';
import CustomModal from '@/components/Modal';
import CustomSelect from '../StudentProfile/components/CustomSelect';
import { Loader2, Plus, X, Globe, Trophy, Briefcase } from 'lucide-react';
import { 
    updateStudentGpa, 
    updateStudentLanguages, 
    updateStudentWorkPreference,
    updateStudentSocialMedia,
    updateStudentCareerGoals,
    fetchQuizQuestions,
    updateStudentQuizAnswers 
} from '../requests';
import AddSkillsModal from './AddSkillsModal';
import languagesData from '../../../../../languages.json';
import { socialLinksConfig } from '../../config/socialLinks';
import { Target, Sparkles, Send, HelpCircle, ChevronRight, MessageSquare, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageItem {
    name: string;
    code: string;
    native: string;
}

interface LanguageSelection {
    language: string;
    level: string;
}

export const SkillsStep = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">Technical Skills</h4>
            <p className="text-sm text-gray-600 mb-4">Add your technical expertise to stand out to employers.</p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors flex items-center justify-center gap-2"
            >
                Add Skills <Plus className="w-4 h-4" />
            </button>
            <AddSkillsModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                currentSkills={[]} 
                currentIndustryId={null} 
            />
        </div>
    );
};

export const GpaStep = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gpa, setGpa] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        if (!gpa || isNaN(Number(gpa))) return;
        setIsSaving(true);
        updateStudentGpa(Number(gpa), () => {
            setIsSaving(false);
            setIsModalOpen(false);
        }, () => {
            setIsSaving(false);
        });
    };

    return (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">GPA</h4>
            <p className="text-sm text-gray-600 mb-4">Showcase your academic performance by adding your GPA.</p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors"
            >
                Fill Your GPA
            </button>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Enter Your GPA"
                maxWidth="500px"
            >
                <div className="p-6 font-outfit">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Cumulative GPA</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            max="4"
                            value={gpa}
                            onChange={(e) => setGpa(e.target.value)}
                            placeholder="e.g. 3.85"
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#CD5656] transition-all"
                        />
                        <p className="text-[11px] text-gray-400 mt-2 italic">Enter your GPA on a 4.0 scale.</p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
                        <button 
                            onClick={handleSave}
                            disabled={!gpa || isSaving}
                            className="px-8 py-2 bg-[#CD5656] text-white font-bold rounded-xl hover:bg-[#B44B4B] disabled:bg-gray-200 transition-all flex items-center gap-2"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save GPA'}
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export const LanguagesStep = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [languages, setLanguages] = useState<LanguageSelection[]>([]);

    const [isSaving, setIsSaving] = useState(false);

    const levels = ['Native', 'Fluent', 'Advanced', 'Basic', 'Beginner'];
    
    const languageOptions = (languagesData as LanguageItem[]).map(lang => ({ value: lang.name, label: lang.name }));

    const handleAddLanguage = () => {
        if (selectedLanguage && selectedLevel) {
            if (!languages.find((l: LanguageSelection) => l.language === selectedLanguage)) {
                setLanguages([...languages, { language: selectedLanguage, level: selectedLevel }]);
                setSelectedLanguage(null);
                setSelectedLevel(null);
            }
        }
    };

    const handleRemoveLanguage = (langName: string) => {
        setLanguages(languages.filter((l: LanguageSelection) => l.language !== langName));
    };

    const handleSave = () => {
        if (languages.length === 0) return;
        setIsSaving(true);
        updateStudentLanguages(languages, () => {
            setIsSaving(false);
            setIsModalOpen(false);
        }, () => {
            setIsSaving(false);
        });
    };

    return (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">Languages</h4>
            <p className="text-sm text-gray-600 mb-4">List the languages you speak to increase your profile visibility.</p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors"
            >
                Add Languages
            </button>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Languages Spoken"
                maxWidth="600px"
            >
                <div className="p-6 font-outfit">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Select Language</label>
                            <CustomSelect 
                                options={languageOptions}
                                selectedValue={selectedLanguage}
                                onValueChange={(val) => setSelectedLanguage(val as string)}
                                placeholder="Choose language..."
                                searchable={true}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Proficiency Level</label>
                            <CustomSelect 
                                options={levels.map(l => ({ value: l, label: l }))}
                                selectedValue={selectedLevel}
                                onValueChange={(val) => setSelectedLevel(val as string)}
                                placeholder="Choose level..."
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleAddLanguage}
                        disabled={!selectedLanguage || !selectedLevel}
                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:border-[#CD5656] hover:text-[#CD5656] transition-all flex items-center justify-center gap-2 mb-8 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400"
                    >
                        <Plus className="w-5 h-5" /> Add Language
                    </button>

                    <div className="space-y-3 mb-8">
                        {languages.map((item: LanguageSelection, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-[#CD5656]" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{item.language}</div>
                                        <div className="text-xs text-gray-400 font-medium">{item.level}</div>
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveLanguage(item.language)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {languages.length === 0 && (
                            <div className="text-center py-8 text-gray-400 italic text-sm">No languages added yet.</div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
                        <button 
                            onClick={handleSave}
                            disabled={languages.length === 0 || isSaving}
                            className="px-10 py-3 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#B44B4B] disabled:bg-gray-200 transition-all flex items-center gap-2 shadow-lg shadow-[#CD5656]/20"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save All Languages'}
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export const MajorStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Specific Major</h4>
        <p className="text-sm text-gray-600 mb-4">Please select your major from the list of available options.</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Select Major
        </button>
    </div>
);

export const DegreeStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Degree Level</h4>
        <p className="text-sm text-gray-600 mb-4">Are you pursuing a Bachelor's, Master's, or PhD?</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Update Degree
        </button>
    </div>
);

export const YearStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Academic Year</h4>
        <p className="text-sm text-gray-600 mb-4">What year of your studies are you currently in?</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Set Year
        </button>
    </div>
);

export const WorkStep = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [preference, setPreference] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        if (!preference) return;
        setIsSaving(true);
        updateStudentWorkPreference(preference, () => {
            setIsSaving(false);
            setIsModalOpen(false);
        }, () => {
            setIsSaving(false);
        });
    };

    return (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">Work Preference</h4>
            <p className="text-sm text-gray-600 mb-4">Remote, hybrid, or on-site? Let us know your preference.</p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors"
            >
                Set Preference
            </button>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Work Preference"
                maxWidth="500px"
            >
                <div className="p-6 font-outfit">
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-6 text-center italic opacity-60">How do you prefer to work?</label>
                        
                        <div className="flex flex-col gap-4">
                            {[
                                { id: 'remote', label: 'Remote', desc: 'Work from anywhere in the world.' },
                                { id: 'on-site', label: 'On-site', desc: "Work from the company's office." },
                                { id: 'hybrid', label: 'Hybrid', desc: 'Mix of remote and office work.' }
                            ].map((item) => (
                                <div 
                                    key={item.id}
                                    onClick={() => setPreference(item.id)}
                                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 cursor-pointer group ${preference === item.id ? 'border-[#CD5656] bg-[#CD5656]/5 shadow-sm' : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${preference === item.id ? 'bg-[#CD5656] text-white scale-110 shadow-md' : 'bg-white text-gray-400 group-hover:scale-105'}`}>
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className={`font-bold text-base ${preference === item.id ? 'text-gray-900' : 'text-gray-700'}`}>{item.label}</div>
                                        <div className="text-xs text-gray-400 leading-relaxed">{item.desc}</div>
                                    </div>
                                    {preference === item.id && (
                                        <div className="w-6 h-6 rounded-full bg-[#CD5656] flex items-center justify-center shadow-sm animate-in zoom-in duration-300">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold hover:text-gray-700 transition-colors">Cancel</button>
                        <button 
                            onClick={handleSave}
                            disabled={!preference || isSaving}
                            className="px-8 py-3 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#B44B4B] disabled:bg-gray-200 transition-all flex items-center gap-2 shadow-lg shadow-[#CD5656]/20 active:scale-95"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Preference'}
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export const SocialStep = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [url, setUrl] = useState('');
    const [socialLinks, setSocialLinks] = useState<{ name: string, link: string }[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const handleAddLink = () => {
        if (selectedPlatform && url) {
            // Simple URL validation
            try {
                new URL(url);
            } catch (_) {
                alert('Please enter a valid URL including http:// or https://');
                return;
            }

            if (!socialLinks.find(l => l.name === selectedPlatform)) {
                setSocialLinks([...socialLinks, { name: selectedPlatform, link: url }]);
                setSelectedPlatform(null);
                setUrl('');
            } else {
                alert('You have already added a link for this platform.');
            }
        }
    };

    const handleRemoveLink = (platformName: string) => {
        setSocialLinks(socialLinks.filter(l => l.name !== platformName));
    };

    const handleSave = () => {
        if (socialLinks.length === 0) return;
        setIsSaving(true);
        updateStudentSocialMedia(socialLinks, () => {
            setIsSaving(false);
            setIsModalOpen(false);
        }, () => {
            setIsSaving(false);
        });
    };

    const platformOptions = socialLinksConfig.map(p => ({ 
        value: p.name, 
        label: p.name,
        image: p.image 
    }));

    return (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">Social Media</h4>
            <p className="text-sm text-gray-600 mb-4">Connect your professional profiles to showcase your work and network.</p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors flex items-center justify-center gap-2"
            >
                Link Profiles <Plus className="w-4 h-4" />
            </button>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Social Media Profiles"
                maxWidth="600px"
            >
                <div className="p-6 font-outfit">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Platform</label>
                            <CustomSelect 
                                options={platformOptions}
                                selectedValue={selectedPlatform}
                                onValueChange={(val) => setSelectedPlatform(val as string)}
                                placeholder="Choose platform..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Profile URL</label>
                            <input 
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder={socialLinksConfig.find(p => p.name === selectedPlatform)?.placeholder || "https://..."}
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#CD5656] transition-all text-sm"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleAddLink}
                        disabled={!selectedPlatform || !url}
                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:border-[#CD5656] hover:text-[#CD5656] transition-all flex items-center justify-center gap-2 mb-8 disabled:opacity-50"
                    >
                        <Plus className="w-5 h-5" /> Add Link
                    </button>

                    <div className="space-y-3 mb-8">
                        {socialLinks.map((item, idx) => {
                            const config = socialLinksConfig.find(p => p.name === item.name);
                            return (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                                            {config?.image ? (
                                                <img src={config.image} alt={item.name} className="w-6 h-6 object-contain" />
                                            ) : (
                                                <Globe className="w-5 h-5 text-[#CD5656]" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="font-bold text-gray-800">{item.name}</div>
                                            <div className="text-xs text-gray-400 font-medium truncate">{item.link}</div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleRemoveLink(item.name)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        })}
                        {socialLinks.length === 0 && (
                            <div className="text-center py-8 text-gray-400 italic text-sm">No profiles linked yet.</div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
                        <button 
                            onClick={handleSave}
                            disabled={socialLinks.length === 0 || isSaving}
                            className="px-10 py-3 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#B44B4B] disabled:bg-gray-200 transition-all flex items-center gap-2 shadow-lg shadow-[#CD5656]/20"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Profiles'}
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export const IndustriesStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Industries</h4>
        <p className="text-sm text-gray-600 mb-4">Which industries are you most interested in for your career?</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Select Industries
        </button>
    </div>
);

export const GoalsStep = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [goals, setGoals] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        if (goals.length < 10) {
            alert('Please share a bit more about your aspirations (at least 10 characters).');
            return;
        }
        setIsSaving(true);
        updateStudentCareerGoals(goals, () => {
            setIsSaving(false);
            setIsModalOpen(false);
        }, () => {
            setIsSaving(false);
        });
    };

    return (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">Career Goals</h4>
            <p className="text-sm text-gray-600 mb-4">Share your vision and aspirations to help us find the perfect opportunities for you.</p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors flex items-center justify-center gap-2"
            >
                Describe Goals <Target className="w-4 h-4" />
            </button>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Your Future Vision"
                maxWidth="600px"
            >
                <div className="p-6 font-outfit">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-[#CD5656]" />
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Define Your Path</label>
                        </div>
                        
                        <textarea 
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            placeholder="Tell us about your aspirations... What kind of impact do you want to make in your field? Where do you see yourself in 5 years?"
                            className="w-full min-h-[200px] p-4 rounded-2xl border-2 border-gray-100 outline-none focus:border-[#CD5656] focus:bg-white bg-gray-50/30 transition-all text-gray-700 resize-none text-base leading-relaxed placeholder:italic placeholder:text-gray-300"
                        />
                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-[10px] text-gray-400 font-medium italic">Your goals help us match you with companies that share your values.</span>
                            <span className={`text-[10px] font-bold ${goals.length < 10 ? 'text-gray-300' : 'text-[#CD5656]'}`}>
                                {goals.length} characters
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold hover:text-gray-700 transition-colors">Maybe later</button>
                        <button 
                            onClick={handleSave}
                            disabled={goals.length < 10 || isSaving}
                            className="px-10 py-3 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#B44B4B] disabled:bg-gray-200 transition-all flex items-center gap-2 shadow-lg shadow-[#CD5656]/20 active:scale-95"
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>Save Aspirations <Send className="w-4 h-4" /></>
                            )}
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export const QuizStep = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questions, setQuestions] = useState<string[]>([]);

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState<number>(0);

    useEffect(() => {
        if (isModalOpen) {
            loadQuestions();
        }
    }, [isModalOpen]);

    const loadQuestions = async () => {
        setIsLoading(true);
        const data = await fetchQuizQuestions();
        setQuestions(data);
        setIsLoading(false);
    };

    const handleAnswerChange = (question: string, value: string) => {
        setAnswers(prev => ({ ...prev, [question]: value }));
    };

    const handleSave = () => {
        const formattedAnswers = questions.map(q => ({
            question: q,
            answer: answers[q] || ''
        })).filter(a => a.answer.trim() !== '');

        if (formattedAnswers.length === 0) {
            return;
        }

        setIsSaving(true);
        updateStudentQuizAnswers(formattedAnswers, () => {
            setIsSaving(false);
            setIsModalOpen(false);
        }, () => {
            setIsSaving(false);
        });
    };

    const progress = questions.length > 0 
        ? (Object.keys(answers).filter(q => answers[q].trim() !== '').length / questions.length) * 100 
        : 0;

    return (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">Student Quiz</h4>
            <p className="text-sm text-gray-600 mb-4">Complete your assessment to help companies understand you better.</p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors flex items-center justify-center gap-2"
            >
                Take Assessment <HelpCircle className="w-4 h-4" />
            </button>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Student Assessment"
                maxWidth="700px"
            >
                <div className="p-0 font-outfit bg-white">
                    <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Your Professional Profile</h3>
                                <p className="text-xs text-gray-400">Answer these questions to help us find your perfect match.</p>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-black text-[#CD5656]">{Math.round(progress)}%</span>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completed</p>
                            </div>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-[#CD5656]"
                            />
                        </div>
                    </div>

                    <div className="p-8">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="w-8 h-8 text-[#CD5656] animate-spin" />
                                <p className="text-sm text-gray-400 font-medium">Loading your assessment questions...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {questions.map((q, index) => (
                                    <div 
                                        key={index}
                                        className={`group transition-all duration-300 ${activeQuestion === index ? 'ring-2 ring-[#CD5656]/10 bg-[#CD5656]/5 rounded-3xl p-6' : 'p-2'}`}
                                    >
                                        <div 
                                            onClick={() => setActiveQuestion(index)}
                                            className="flex items-center gap-4 cursor-pointer"
                                        >
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${activeQuestion === index ? 'bg-[#CD5656] text-white rotate-12 shadow-lg shadow-[#CD5656]/20' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                                {answers[q]?.trim() ? <Check className="w-5 h-5" /> : <span className="text-sm font-bold">{index + 1}</span>}
                                            </div>
                                            <h5 className={`font-bold text-sm flex-1 ${activeQuestion === index ? 'text-gray-900' : 'text-gray-500'}`}>
                                                {q}
                                            </h5>
                                            <ChevronRight className={`w-4 h-4 transition-transform ${activeQuestion === index ? 'rotate-90 text-[#CD5656]' : 'text-gray-300'}`} />
                                        </div>

                                        <AnimatePresence>
                                            {activeQuestion === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-6">
                                                        <div className="relative">
                                                            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-300" />
                                                            <textarea
                                                                value={answers[q] || ''}
                                                                onChange={(e) => handleAnswerChange(q, e.target.value)}
                                                                placeholder="Type your answer here..."
                                                                className="w-full min-h-[120px] pl-12 pr-4 py-4 rounded-2xl border-2 border-white focus:border-[#CD5656] outline-none transition-all text-sm font-medium text-gray-700 bg-white/50"
                                                            />
                                                        </div>
                                                        <div className="flex justify-end mt-4">
                                                            <button 
                                                                onClick={() => index < questions.length - 1 ? setActiveQuestion(index + 1) : null}
                                                                className="text-xs font-bold text-[#CD5656] hover:underline flex items-center gap-1"
                                                            >
                                                                {index === questions.length - 1 ? 'Last Question' : 'Next Question'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                        <button onClick={() => setIsModalOpen(false)} className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Finish Later</button>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving || Object.keys(answers).length === 0}
                            className="px-10 py-3 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#B44B4B] disabled:bg-gray-200 transition-all flex items-center gap-2 shadow-lg shadow-[#CD5656]/20 active:scale-95"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit Assessment <Send className="w-4 h-4" /></>}
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export const ComponentsMap: Record<string, React.ReactNode> = {
    specific_major: <MajorStep />,
    degree_level: <DegreeStep />,
    gpa: <GpaStep />,
    academic_year: <YearStep />,
    technical_skills: <SkillsStep />,
    languages: <LanguagesStep />,
    work_preference: <WorkStep />,
    social_media: <SocialStep />,
    industries_preferences: <IndustriesStep />,
    career_goals: <GoalsStep />,
    student_answers: <QuizStep />
};
