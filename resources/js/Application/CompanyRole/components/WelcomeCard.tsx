import React from 'react';
import { motion } from 'framer-motion';
import { Hand } from 'lucide-react';

export default function WelcomeCard() {
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

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
            <div className="flex items-start gap-4">
                <motion.div
                    animate={{ rotate: [0, 14, -8, 14, -8, 0] }}
                    transition={{ 
                        duration: 0.6, 
                        repeat: Infinity, 
                        repeatDelay: 3,
                        ease: 'easeInOut' 
                    }}
                    className="flex-shrink-0"
                >
                    <div 
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: 'rgba(205, 86, 86, 0.1)' }}
                    >
                        <Hand className="w-6 h-6" style={{ color: '#CD5656' }} />
                    </div>
                </motion.div>
                
                <div className="flex-1">
                    <h2 
                        className="text-xl font-semibold mb-2"
                        style={{ color: '#2A2A2A' }}
                    >
                        {greeting}!
                    </h2>
                    <p 
                        className="text-base leading-relaxed"
                        style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                    >
                        Ready to make some moves? Let's see what opportunities are waiting for you today.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

