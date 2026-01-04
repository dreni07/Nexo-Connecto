import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Users, Eye, Heart } from 'lucide-react';

interface WeeklyData {
    day: string;
    studentDiscoveries: number;
    matchGrowth: number;
    profileViews: number;
}

const weeklyData: WeeklyData[] = [
    { day: 'Mon', studentDiscoveries: 12, matchGrowth: 8, profileViews: 24 },
    { day: 'Tue', studentDiscoveries: 15, matchGrowth: 12, profileViews: 28 },
    { day: 'Wed', studentDiscoveries: 18, matchGrowth: 15, profileViews: 32 },
    { day: 'Thu', studentDiscoveries: 14, matchGrowth: 18, profileViews: 35 },
    { day: 'Fri', studentDiscoveries: 22, matchGrowth: 20, profileViews: 42 },
    { day: 'Sat', studentDiscoveries: 19, matchGrowth: 16, profileViews: 38 },
    { day: 'Sun', studentDiscoveries: 16, matchGrowth: 14, profileViews: 30 },
];

const metrics = [
    {
        label: 'Student Discoveries',
        dataKey: 'studentDiscoveries',
        color: '#CD5656',
        icon: Users,
        value: 116,
        change: '+12%',
    },
    {
        label: 'Match Growth',
        dataKey: 'matchGrowth',
        color: '#DA6C6C',
        icon: Heart,
        value: 103,
        change: '+18%',
    },
    {
        label: 'Profile Views',
        dataKey: 'profileViews',
        color: '#AF3E3E',
        icon: Eye,
        value: 229,
        change: '+24%',
    },
];

export default function WeeklyPerformance() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md font-outfit"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
        >
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5" style={{ color: '#CD5656' }} />
                <h3 
                    className="text-lg font-semibold"
                    style={{ color: '#2A2A2A' }}
                >
                    Weekly Performance
                </h3>
            </div>

            <div className="space-y-5">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <div key={metric.label} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" style={{ color: metric.color }} />
                                    <span 
                                        className="text-sm font-medium"
                                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                    >
                                        {metric.label}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span 
                                        className="text-sm font-semibold"
                                        style={{ color: '#2A2A2A' }}
                                    >
                                        {metric.value}
                                    </span>
                                    <span 
                                        className="text-xs font-medium px-2 py-0.5 rounded"
                                        style={{ 
                                            backgroundColor: `${metric.color}15`,
                                            color: metric.color,
                                        }}
                                    >
                                        {metric.change}
                                    </span>
                                </div>
                            </div>
                            <div className="h-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={weeklyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                        <XAxis 
                                            dataKey="day" 
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: 'rgba(0, 0, 0, 0.4)' }}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                                borderRadius: '8px',
                                                padding: '8px 12px',
                                                fontSize: '12px',
                                            }}
                                            labelStyle={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey={metric.dataKey} 
                                            stroke={metric.color}
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 4, fill: metric.color }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
