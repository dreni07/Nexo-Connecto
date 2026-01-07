import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUserCoins } from './coin-requests';
import { X } from 'lucide-react';

interface UserCoin {
    id: number;
    coin_name: string;
    coin_image: string;
    balance: number;
}

interface CoinProgressModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AnimatedCounter = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        if (start === end) return;

        let totalDuration = 1500;
        let increment = end / (totalDuration / 16);
        
        let timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{count}</span>;
};

export default function CoinProgressModal({ isOpen, onClose }: CoinProgressModalProps) {
    const [userCoins, setUserCoins] = useState<UserCoin[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            const loadUserCoins = async () => {
                setIsLoading(true);
                const data = await fetchUserCoins();
                setUserCoins(data);
                setIsLoading(false);
            };
            loadUserCoins();
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                >
                    <div className="relative w-full max-w-4xl bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                        {/* Decorative background glow */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-red/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red/10 rounded-full blur-3xl pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-black text-white font-outfit uppercase tracking-tight mb-2">
                                Your Progress
                            </h2>
                            <p className="text-white/60 font-outfit">
                                Track your achievements and earned rewards
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
                            {isLoading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <div key={i} className="flex flex-col items-center animate-pulse">
                                        <div className="w-32 h-32 bg-white/5 rounded-full mb-4" />
                                        <div className="h-8 w-16 bg-white/5 rounded" />
                                    </div>
                                ))
                            ) : (
                                userCoins.map((coin, index) => (
                                    <motion.div
                                        key={coin.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex flex-col items-center group"
                                    >
                                        <div className="relative mb-6">
                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 bg-red/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center"
                                            >
                                                <img
                                                    src={`/storage/${coin.coin_image}`}
                                                    alt={coin.coin_name}
                                                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                                />
                                            </motion.div>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-4xl md:text-5xl font-black text-white font-outfit mb-1">
                                                <AnimatedCounter value={coin.balance} />
                                            </div>
                                            <div className="text-sm font-bold text-red font-outfit uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                                {coin.coin_name}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="mt-16 flex justify-center">
                            <button
                                onClick={onClose}
                                className="px-10 py-3 bg-red hover:bg-red-dark text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(205,86,86,0.3)] font-outfit cursor-pointer"
                            >
                                Continue Learning
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

