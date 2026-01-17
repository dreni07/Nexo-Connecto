import React from 'react';
import { router } from '@inertiajs/react';
import { ChevronLeft, Play, Send, Settings, Code2 } from 'lucide-react';
import NexoLogo from '@/components/NexoLogo';
import { useProblem } from '../context/ProblemContext';

const ProblemControlBar = () => {
    const { code, setIsSubmitting, isSubmitting } = useProblem();

    const handleSubmit = () => {
        if (isSubmitting) return;

        console.log("Submitting code:", code);
        setIsSubmitting(true);

        // Simulate a submission process for now
        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
    };

    return (
        <nav className="h-[10%] border-b border-gray-100 flex items-center justify-between px-6 bg-white z-10">
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => router.visit('/student/problems')}
                    className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <NexoLogo size="sm" />
                <div className="h-6 w-[1px] bg-gray-200 mx-2" />
                <div className="flex items-center gap-2 text-[#CD5656]">
                    <Code2 className="w-5 h-5" />
                    <span className="font-bold text-gray-900">Problem Solving</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-all">
                    <Play className="w-4 h-4" />
                    Run Tests
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-6 py-2 bg-[#CD5656] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#CD5656]/20 active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#b44b4b]'}`}
                >
                    {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Send className="w-4 h-4" />
                    )}
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <div className="h-6 w-[1px] bg-gray-200 mx-2" />
                <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400">
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </nav>
    );
};

export default ProblemControlBar;

