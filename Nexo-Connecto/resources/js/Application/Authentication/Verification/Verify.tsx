import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Notification, { NotificationType } from '../../Notification';
import AuthNavigation from '../components/AuthNavigation';
import { handleRequest , verifyCode } from '../requests';

interface VerifyProps {
    email: string;
}

const Verify = ({ email }: VerifyProps) => {
    const [codes, setCodes] = useState<string[]>(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(0);

    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [processing, setProcessing] = useState(false);
    
    const [verifying, setVerifying] = useState(false);
    const [notification, setNotification] = useState<{
        type: NotificationType;
        message: string;
    } | null>(null);
    
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);


    const handleResendCode = async () => {
        if (isResendDisabled || processing) return;

        setProcessing(true);
        setNotification(null);
        setIsResendDisabled(true);
        setCountdown(60);

        try {
            const result = await handleRequest();

            if (result.success) {
                setNotification({
                    type: 'success',
                    message: result.message || 'Verification code sent successfully.',
                });
            } else {
                setNotification({
                    type: 'fail',
                    message: result.message || 'Failed to send verification code. Please try again.',
                });
                // Re-enable button on error
                setIsResendDisabled(false);
            }
        } catch (error) {
            setNotification({
                type: 'fail',
                message: error instanceof Error ? error.message : 'Failed to send verification code. Please try again.',
            });
            // Re-enable button on error
            setIsResendDisabled(false);
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        if (isResendDisabled) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setIsResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isResendDisabled]);

    // Auto-verify when all 6 digits are entered
    useEffect(() => {
        const fullCode = codes.join('');
        // Check if all 6 inputs have a value (not empty)
        const allFilled = codes.every(code => code !== '') && fullCode.length === 6;
        
        if (allFilled && !verifying) {
            // Small delay to ensure state is fully updated
            const timer = setTimeout(() => {
                handleVerifyCode(fullCode);
            }, 150);
            
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codes, verifying]);

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return;
        
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);

        // Auto-advance to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === 'Backspace' && !codes[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        
        // Handle paste
        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText().then((text) => {
                const digits = text.replace(/\D/g, '').slice(0, 6);
                if (digits.length === 6) {
                    const newCodes = digits.split('');
                    setCodes(newCodes);
                    inputRefs.current[5]?.focus();
                    handleVerifyCode(digits);
                }
            });
        }
    };

    const handleVerifyCode = async (code: string) => {
        if (verifying) return;
        
        setVerifying(true);
        setNotification(null);

        try {
            const result = await verifyCode({ code });

            if (result.success) {
                setNotification({
                    type: 'success',
                    message: result.message || 'Email verified successfully!',
                });
                
                setTimeout(() => {
                    if (result.user?.role === 'company') {
                        window.location.href = '/company/dashboard';
                    } else if (result.user?.role === 'student') {
                        window.location.href = '/student/dashboard';
                    } else {
                        window.location.href = '/company/dashboard';
                    }
                }, 1500);
            } else {
                setNotification({
                    type: 'fail',
                    message: result.message || 'Invalid verification code.',
                });
                // Clear codes on error
                setCodes(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            setNotification({
                type: 'fail',
                message: error instanceof Error ? error.message : 'Failed to verify code. Please try again.',
            });
            // Clear codes on error
            setCodes(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setVerifying(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut' as const,
            },
        },
    };

    return (
        <>
            <Head title="Verify Email" />
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                    position="top-right"
                />
            )}
            <div className="relative flex min-h-svh flex-col overflow-hidden" style={{ backgroundColor: '#F4F5ED' }}>
                {/* Background Elements - Reduced gradient intensity */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
                            radial-gradient(circle at 15% 25%, rgba(205, 86, 86, 0.04) 0%, transparent 45%),
                            radial-gradient(circle at 85% 75%, rgba(218, 108, 108, 0.03) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(175, 62, 62, 0.025) 0%, transparent 55%)
                        `
                    }}
                />
                
                <div className="absolute inset-0 pointer-events-none">
                    <div 
                        className="absolute top-10 left-5 w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
                        style={{ backgroundColor: '#CD5656' }}
                    />
                    <div 
                        className="absolute bottom-10 right-5 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-[0.05]"
                        style={{ backgroundColor: '#DA6C6C' }}
                    />
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-[0.04]"
                        style={{ backgroundColor: '#AF3E3E' }}
                    />
                    
                    <div 
                        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl opacity-[0.035]"
                        style={{ backgroundColor: '#CD5656' }}
                    />
                    <div 
                        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-2xl opacity-[0.03]"
                        style={{ backgroundColor: '#DA6C6C' }}
                    />
                    
                    <div 
                        className="absolute top-0 left-1/3 w-px h-full opacity-[0.025]"
                        style={{ 
                            background: 'linear-gradient(to bottom, transparent, rgba(205, 86, 86, 0.3), transparent)',
                        }}
                    />
                    <div 
                        className="absolute top-0 right-1/3 w-px h-full opacity-[0.025]"
                        style={{ 
                            background: 'linear-gradient(to bottom, transparent, rgba(218, 108, 108, 0.3), transparent)',
                        }}
                    />
                </div>

                <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.015]"
                    style={{
                        backgroundImage: `
                            linear-gradient(30deg, transparent 40%, rgba(205, 86, 86, 0.1) 50%, transparent 60%),
                            linear-gradient(120deg, transparent 40%, rgba(218, 108, 108, 0.1) 50%, transparent 60%)
                        `,
                        backgroundSize: '200px 200px',
                    }}
                />

                {/* Top Navigation */}
                <AuthNavigation />

                <div className="relative flex flex-1 items-center justify-center overflow-hidden p-6 md:p-10">
                    <div
                        className="absolute pointer-events-none transition-all duration-700 ease-out"
                        style={{
                            left: `${mousePosition.x}px`,
                            top: `${mousePosition.y}px`,
                            transform: 'translate(-50%, -50%)',
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(205, 86, 86, 0.08) 0%, rgba(218, 108, 108, 0.04) 40%, transparent 70%)',
                            filter: 'blur(60px)',
                            opacity: 0.4,
                            zIndex: 1,
                        }}
                    />

                    <motion.div
                        className="relative z-10 w-full max-w-md"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="flex flex-col gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Icon and Title */}
                            <div className="flex flex-col gap-4 text-center">
                                <motion.div
                                    className="flex justify-center mb-2"
                                    variants={itemVariants}
                                >
                                    <div 
                                        className="p-3 rounded-xl"
                                        style={{ 
                                            backgroundColor: 'rgba(205, 86, 86, 0.1)',
                                        }}
                                    >
                                        <Mail 
                                            className="w-6 h-6 md:w-7 md:h-7"
                                            style={{ color: '#CD5656' }}
                                        />
                                    </div>
                                </motion.div>
                                
                                <motion.h1 
                                    className="text-4xl font-semibold tracking-tight text-foreground md:text-[48px] font-outfit"
                                    variants={itemVariants}
                                >
                                    Verify your email
                                </motion.h1>
                                
                                <motion.p
                                    className="text-lg text-muted-foreground md:text-xl font-outfit"
                                    variants={itemVariants}
                                >
                                    We sent you a verification code to{' '}
                                    <span className="font-medium text-foreground">{email}</span>
                                </motion.p>
                            </div>

                            {/* Code Inputs */}
                            <motion.div
                                className="flex flex-col gap-6"
                                variants={itemVariants}
                            >
                                <div className="flex justify-center gap-3">
                                    {codes.map((code, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative"
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <input
                                                ref={(el) => {
                                                    inputRefs.current[index] = el;
                                                }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={code}
                                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl md:text-3xl font-semibold rounded-xl border transition-all duration-200 focus:outline-none focus:ring-0 font-outfit relative z-10"
                                                style={{
                                                    backgroundColor: '#F8F9F3',
                                                    borderColor: code ? 'rgba(205, 86, 86, 0.3)' : 'rgba(0, 0, 0, 0.08)',
                                                    boxShadow: code ? '0 2px 8px 0 rgba(205, 86, 86, 0.15)' : '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                                                    color: '#CD5656',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(205, 86, 86, 0.5)';
                                                    e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(205, 86, 86, 0.2), 0 0 0 3px rgba(205, 86, 86, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    if (!code) {
                                                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                                        e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
                                                    }
                                                }}
                                                autoFocus={index === 0}
                                                disabled={verifying}
                                            />
                                            <div
                                                className="absolute inset-0 rounded-xl pointer-events-none"
                                                style={{
                                                    border: '2px solid transparent',
                                                    background: 'linear-gradient(#F8F9F3, #F8F9F3) padding-box, linear-gradient(90deg, rgba(205, 86, 86, 0.3), rgba(218, 108, 108, 0.3), rgba(205, 86, 86, 0.3)) border-box',
                                                    backgroundSize: '200% 200%',
                                                    animation: 'borderPulse 3s ease-in-out infinite',
                                                    opacity: code ? 0.6 : 0,
                                                    transition: 'opacity 0.3s ease',
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                                <style>{`
                                    @keyframes borderPulse {
                                        0%, 100% {
                                            background-position: 0% 50%;
                                        }
                                        50% {
                                            background-position: 100% 50%;
                                        }
                                    }
                                `}</style>

                                {/* Resend Button */}
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => handleResendCode()}
                                        disabled={isResendDisabled || processing}
                                        className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-outfit cursor-pointer"
                                        style={{
                                            backgroundColor: isResendDisabled || processing ? 'rgba(205, 86, 86, 0.1)' : 'rgba(205, 86, 86, 0.15)',
                                            color: isResendDisabled ? '#6c757d' : '#CD5656',
                                            border: `1px solid ${isResendDisabled ? 'rgba(0, 0, 0, 0.08)' : 'rgba(205, 86, 86, 0.3)'}`,
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isResendDisabled && !processing) {
                                                e.currentTarget.style.backgroundColor = 'rgba(205, 86, 86, 0.2)';
                                                e.currentTarget.style.borderColor = 'rgba(205, 86, 86, 0.4)';
                                                e.currentTarget.style.transform = 'translateY(-1px)';
                                                e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(205, 86, 86, 0.15)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isResendDisabled && !processing) {
                                                e.currentTarget.style.backgroundColor = 'rgba(205, 86, 86, 0.15)';
                                                e.currentTarget.style.borderColor = 'rgba(205, 86, 86, 0.3)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            if (!isResendDisabled && !processing) {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }
                                        }}
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2">
                                                <svg
                                                    className="animate-spin h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : isResendDisabled ? (
                                            `Send Code Again (${countdown}s)`
                                        ) : (
                                            'Send Code Again'
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Verify;
