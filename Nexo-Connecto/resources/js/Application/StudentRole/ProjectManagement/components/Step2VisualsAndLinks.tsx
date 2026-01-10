import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Link as LinkIcon, Github, X, Upload, Loader2, Code2 } from 'lucide-react';
import { fetchGithubTechStack, LanguageStack } from '@/lib/github';
import TagInput from './TagInput';

interface Step2Props {
    data: {
        images: File[];
        liveDemoUrl: string;
        githubUrl: string;
        techStack: { name: string; percentage?: number }[];
    };
    onDataChange: (field: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
}

const TechStackRow = ({ name, percentage }: { name: string; percentage?: number }) => (
    <div className="space-y-1.5">
        <div className="flex justify-between items-center px-1">
            <span className="text-sm font-bold text-gray-700">{name}</span>
            {percentage !== undefined && (
                <span className="text-xs font-black text-[#CD5656]">{percentage}%</span>
            )}
        </div>
        {percentage !== undefined && (
            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-gray-100">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className="h-full bg-[#CD5656]"
                />
            </div>
        )}
    </div>
);

const ImagePreview = ({ url, onRemove }: { url: string; onRemove: () => void }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 group"
    >
        <img src={url} alt="Preview" className="w-full h-full object-cover" />
        <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg active:scale-90"
        >
            <X className="w-3 h-3" />
        </button>
    </motion.div>
);

const Step2VisualsAndLinks: React.FC<Step2Props> = ({ data, onDataChange, onNext, onBack }) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [isFetchingStack, setIsFetchingStack] = useState(false);
    const [usingGithubStack, setUsingGithubStack] = useState(false);

    useEffect(() => {
        const newPreviews = data.images.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
        return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
    }, [data.images]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const totalImages = [...data.images, ...filesArray].slice(0, 5);
            onDataChange('images', totalImages);
        }
    };

    const removeImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        onDataChange('images', newImages);
    };

    const handleGithubUrlChange = async (url: string) => {
        onDataChange('githubUrl', url);
        if (url.includes('github.com')) {
            setIsFetchingStack(true);
            const stack = await fetchGithubTechStack(url);
            if (stack.length > 0) {
                onDataChange('techStack', stack);
                setUsingGithubStack(true);
            } else {
                setUsingGithubStack(false);
            }
            setIsFetchingStack(false);
        } else {
            setUsingGithubStack(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10 font-outfit"
        >
            <div className="space-y-4">
                <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-bold text-gray-700">Project Visuals (Max 5)</label>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        {data.images.length} / 5 Images
                    </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <AnimatePresence>
                        {previews.map((url, index) => (
                            <ImagePreview 
                                key={url} 
                                url={url} 
                                onRemove={() => removeImage(index)} 
                            />
                        ))}
                    </AnimatePresence>
                    
                    {data.images.length < 5 && (
                        <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#CD5656] hover:bg-[#CD5656]/5 transition-all group">
                            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                            <Upload className="w-6 h-6 text-gray-300 group-hover:text-[#CD5656] transition-colors" />
                            <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Upload</span>
                        </label>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Live Demo URL (Optional)</label>
                    <div className="relative group">
                        <input
                            type="url"
                            value={data.liveDemoUrl}
                            onChange={(e) => onDataChange('liveDemoUrl', e.target.value)}
                            placeholder="https://your-project.com"
                            className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#CD5656] transition-all text-gray-800 font-bold placeholder:text-gray-300 placeholder:font-normal pl-12"
                        />
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200 group-focus-within:text-[#CD5656] transition-colors" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">GitHub Repository</label>
                    <div className="relative group">
                        <input
                            type="url"
                            value={data.githubUrl}
                            onChange={(e) => handleGithubUrlChange(e.target.value)}
                            placeholder="https://github.com/user/repo"
                            className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#CD5656] transition-all text-gray-800 font-bold placeholder:text-gray-300 placeholder:font-normal pl-12"
                        />
                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200 group-focus-within:text-[#CD5656] transition-colors" />
                        {isFetchingStack && (
                            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#CD5656] animate-spin" />
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 ml-1">
                    <Code2 className="w-5 h-5 text-[#CD5656]" />
                    <label className="text-sm font-bold text-gray-700">Technology Stack</label>
                </div>

                {usingGithubStack ? (
                    <div className="bg-gray-50 rounded-[24px] p-6 border border-gray-100 space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fetched from GitHub</span>
                            <button 
                                onClick={() => setUsingGithubStack(false)}
                                className="text-[10px] font-bold text-[#CD5656] uppercase hover:underline"
                            >
                                Edit Manually
                            </button>
                        </div>
                        <div className="space-y-3">
                            {data.techStack.map((lang) => (
                                <TechStackRow 
                                    key={lang.name} 
                                    name={lang.name} 
                                    percentage={lang.percentage} 
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <TagInput
                        tags={data.techStack.map(s => s.name)}
                        onTagsChange={(tags) => onDataChange('techStack', tags.map(t => ({ name: t })))}
                        placeholder="e.g. React, Node.js, PostgreSQL..."
                        emptyText="No technologies added yet. Listing your stack helps showcase your skills."
                    />
                )}
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
                    className="px-12 py-4 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#B44B4B] transition-all shadow-lg shadow-[#CD5656]/20 active:scale-95"
                >
                    Continue to Insights
                </button>
            </div>
        </motion.div>
    );
};

export default Step2VisualsAndLinks;

