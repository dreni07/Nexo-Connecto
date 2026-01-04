import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Users } from 'lucide-react';

interface Insight {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
}

const insights: Insight[] = [
    {
        icon: TrendingUp,
        title: 'Platform Growth',
        description: 'Student registrations increased by 23% this week. More talent is joining the platform.',
        color: '#CD5656',
    },
    {
        icon: Users,
        title: 'Active Students',
        description: 'Over 150 students are actively looking for opportunities matching your company profile.',
        color: '#DA6C6C',
    },
    {
        icon: Lightbulb,
        title: 'Tip of the Day',
        description: 'Complete your company culture section to increase match quality by 40%.',
        color: '#AF3E3E',
    },
];

export default function InsightsSection() {
    return (
        <div className="space-y-4">
            <h3 
                className="text-lg font-semibold mb-4 font-outfit"
                style={{ color: '#2A2A2A' }}
            >
                Insights & Updates
            </h3>
            
            <div className="grid gap-4">
                {insights.map((insight, index) => {
                    const Icon = insight.icon;
                    
                    return (
                        <motion.div
                            key={insight.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md font-outfit"
                            style={{
                                backgroundColor: '#FFFFFF',
                                border: '1px solid rgba(0, 0, 0, 0.06)',
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div 
                                    className="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0"
                                    style={{ backgroundColor: `${insight.color}15` }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: insight.color }} />
                                </div>
                                <div className="flex-1">
                                    <h4 
                                        className="text-base font-semibold mb-1"
                                        style={{ color: '#2A2A2A' }}
                                    >
                                        {insight.title}
                                    </h4>
                                    <p 
                                        className="text-sm leading-relaxed"
                                        style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                    >
                                        {insight.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

