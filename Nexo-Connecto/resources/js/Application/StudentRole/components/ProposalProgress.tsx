import React, { useState } from 'react';
import { Calendar, Send, Users, Award, ChevronDown } from 'lucide-react';

interface ProposalMetric {
    label: string;
    value: number;
    icon: React.ElementType;
    color: string;
}

interface ProposalProgressProps {
    date?: string;
    metrics?: ProposalMetric[];
}

const defaultMetrics: ProposalMetric[] = [
    { label: 'Proposals sent', value: 24, icon: Send, color: '#4A90E2' },
    { label: 'Interviews', value: 8, icon: Users, color: '#CD5656' },
    { label: 'Hires', value: 3, icon: Award, color: '#66BB6A' },
];

const ProposalProgress: React.FC<ProposalProgressProps> = ({ 
    date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    metrics = defaultMetrics 
}) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const maxValue = Math.max(...metrics.map(m => m.value));

    return (
        <div 
            className="rounded-2xl p-6 transition-all duration-300 font-outfit"
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
            <div className="flex items-center justify-between mb-6">
                <h3 
                    className="text-lg font-semibold"
                    style={{ color: '#2A2A2A' }}
                >
                    Proposal Progress
                </h3>
                <button
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{date}</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-5">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    const barHeight = (metric.value / maxValue) * 100;
                    return (
                        <div key={index}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" style={{ color: metric.color }} />
                                    <span 
                                        className="text-sm font-medium"
                                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                    >
                                        {metric.label}
                                    </span>
                                </div>
                                <span 
                                    className="text-lg font-bold"
                                    style={{ color: metric.color }}
                                >
                                    {metric.value}
                                </span>
                            </div>
                            <div className="relative w-full h-8 rounded-md overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                                <div
                                    className="absolute bottom-0 left-0 right-0 flex gap-0.5 items-end"
                                    style={{ height: '100%' }}
                                >
                                    {Array.from({ length: Math.min(metric.value, 50) }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-sm"
                                            style={{
                                                backgroundColor: metric.color,
                                                height: `${Math.random() * 30 + 50}%`,
                                                minHeight: '4px',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProposalProgress;

