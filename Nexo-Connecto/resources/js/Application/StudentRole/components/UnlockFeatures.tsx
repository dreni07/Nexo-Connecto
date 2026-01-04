import React from 'react';
import { Sparkles, ArrowRight, Files } from 'lucide-react';

interface UnlockFeaturesProps {
    feature?: {
        title: string;
        description: string;
        benefit: string;
    };
}

const UnlockFeatures: React.FC<UnlockFeaturesProps> = ({ 
    feature = {
        title: 'Unlock Premium Features',
        description: 'Get access to exclusive benefits and expand your internship opportunities',
        benefit: 'Compare your CV with other students who applied to the same company',
    }
}) => {
    return (
        <div 
            className="rounded-2xl p-6 transition-all duration-300 font-outfit relative overflow-hidden h-full"
            style={{
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }}
        >
            {/* Decorative dots pattern */}
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #CD5656 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            />
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" style={{ color: '#CD5656' }} />
                    <h3 
                        className="text-lg font-semibold"
                        style={{ color: '#2A2A2A' }}
                    >
                        {feature.title}
                    </h3>
                </div>

                <p 
                    className="text-sm mb-4"
                    style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                >
                    {feature.description}
                </p>

                <div className="flex items-center gap-2 mb-6 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <Files className="w-4 h-4" style={{ color: '#CD5656' }} />
                    <span 
                        className="text-xs font-medium"
                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                    >
                        {feature.benefit}
                    </span>
                </div>

                <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90 cursor-pointer"
                    style={{
                        backgroundColor: '#CD5656',
                        color: '#FFFFFF',
                    }}
                >
                    Upgrade now
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default UnlockFeatures;

