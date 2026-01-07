import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchCoinTypes, markIntroAsSeen } from './coin-requests';

interface Coin {
    id: number;
    coin_name: string;
    coin_description: string;
    coin_image: string;
    coin_explained_description: string;
}

export default function CoinIntroduction() {
    const { auth } = usePage().props as any;
    const [coins, setCoins] = useState<Coin[]>([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (auth.user && !auth.user.has_seen_coins_intro) {
            const hasWelcomeOverlay = new URLSearchParams(window.location.search).get('completed') === 'true';
            
            if (hasWelcomeOverlay) {
                const timer = setTimeout(() => {
                    loadCoins();
                }, 5500);
                return () => clearTimeout(timer);
            } else {
                loadCoins();
            }
        }
    }, [auth.user]);

    const loadCoins = async () => {
        const data = await fetchCoinTypes();
        if (data.length > 0) {
            setCoins(data);
            setIsVisible(true);
        }
    };

    const handleNext = async () => {
        if (currentIndex < coins.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            await markIntroAsSeen();
            setIsVisible(false);
        }
    };

    if (!isVisible || coins.length === 0) return null;

    const currentCoin = coins[currentIndex];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                >
                    <div className="relative w-full max-w-2xl flex flex-col items-center">
                        <div className="relative mb-12 flex justify-center items-center h-80 w-80 md:h-96 md:w-96">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ 
                                    duration: 3, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-red/20 rounded-full blur-3xl"
                            />
                            
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentCoin.id}
                                    initial={{ 
                                        rotateY: 0, 
                                        scale: 0, 
                                        opacity: 0,
                                        z: -500 
                                    }}
                                    animate={{ 
                                        rotateY: 1800, 
                                        scale: 1, 
                                        opacity: 1,
                                        z: 0 
                                    }}
                                    exit={{ 
                                        scale: 0, 
                                        opacity: 0, 
                                        rotateY: 0,
                                        transition: { duration: 0.5 }
                                    }}
                                    transition={{ 
                                        duration: 2.5, 
                                        ease: [0.34, 1.56, 0.64, 1], 
                                        type: "spring",
                                        stiffness: 40,
                                        damping: 10
                                    }}
                                    className="relative z-10 w-full h-full flex items-center justify-center perspective-[1000px]"
                                    onAnimationStart={() => setIsAnimating(true)}
                                    onAnimationComplete={() => setIsAnimating(false)}
                                >
                                    <img
                                        src={`/storage/${currentCoin.coin_image}`}
                                        alt={currentCoin.coin_name}
                                        className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(205,86,86,0.5)]"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <motion.div
                            key={`text-${currentCoin.id}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.8 }}
                            className="text-center"
                        >
                            <h2 className="text-5xl font-black text-white mb-4 tracking-tight font-outfit uppercase">
                                {currentCoin.coin_name}
                            </h2>
                            <p className="text-xl text-gray-300 font-outfit font-medium max-w-lg mx-auto mb-10 leading-relaxed">
                                {currentCoin.coin_description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                {currentIndex < coins.length - 1 ? (
                                    <button
                                        onClick={handleNext}
                                        disabled={isAnimating}
                                        className={`
                                            px-12 py-4 bg-red text-white font-bold rounded-full 
                                            text-lg transition-all duration-300 transform cursor-pointer font-outfit
                                            ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-dark hover:scale-105 active:scale-95'}
                                            shadow-[0_0_25px_rgba(205,86,86,0.3)]
                                        `}
                                    >
                                        Explore Next
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleNext}
                                            disabled={isAnimating}
                                            className={`
                                                px-10 py-4 bg-red text-white font-bold rounded-full 
                                                text-lg transition-all duration-300 transform cursor-pointer font-outfit
                                                ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-dark hover:scale-105 active:scale-95'}
                                                shadow-[0_0_25px_rgba(205,86,86,0.3)]
                                            `}
                                        >
                                            Get Started
                                        </button>
                                        <button
                                            onClick={() => window.open('/help/coins', '_blank')}
                                            disabled={isAnimating}
                                            className={`
                                                px-10 py-4 bg-white/10 text-white font-bold rounded-full 
                                                text-lg transition-all duration-300 transform cursor-pointer font-outfit
                                                border border-white/20 backdrop-blur-sm
                                                ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20 hover:scale-105 active:scale-95'}
                                            `}
                                        >
                                            Learn More
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            <div className="mt-8 flex justify-center gap-2.5">
                                {coins.map((_, idx) => (
                                    <div 
                                        key={idx}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            idx === currentIndex ? 'w-10 bg-red' : 'w-2.5 bg-white/20'
                                        }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
