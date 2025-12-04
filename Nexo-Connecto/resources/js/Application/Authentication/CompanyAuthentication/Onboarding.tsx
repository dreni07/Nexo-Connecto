import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { SiGoogle } from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';
import { Building2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import TypingText from './TypingText';
import Tooltip from '@/components/Tooltip';
import { createCompanyAccount } from '../requests';
import Notification, { NotificationType } from '../../Notification';

interface OnboardingProps {
    // Add any props that might be passed from the backend
}

export default function CompanyOnboarding({}: OnboardingProps) {
    const { errors: pageErrors } = usePage().props as { errors?: Record<string, string> };
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);
    const [notification, setNotification] = useState<{
        type: NotificationType;
        message: string;
    } | null>(null);
    
    const errors = pageErrors || {};

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleTypingComplete = () => {
        setShowContent(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setNotification(null);

        await createCompanyAccount(
            { email, password },
            {
                onSuccess: () => {
                    setProcessing(false);
                },
                onError: (message: string) => {
                    setProcessing(false);
                    setNotification({
                        type: 'fail',
                        message: message,
                    });
                },
                onFinish: () => {
                    setProcessing(false);
                },
                preserveScroll: true,
            }
        );
    };

    const handleOAuthRedirect = (provider: string) => {
        window.location.href = `/auth/${provider}`;
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
            <Head title="Company Onboarding" />
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                    position="top-right"
                />
            )}
            <div className="relative flex min-h-svh flex-col overflow-hidden" style={{ backgroundColor: '#F4F5ED' }}>
                {/* Background Elements - Cover entire page including header */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
                            radial-gradient(circle at 15% 25%, rgba(205, 86, 86, 0.08) 0%, transparent 45%),
                            radial-gradient(circle at 85% 75%, rgba(218, 108, 108, 0.06) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(175, 62, 62, 0.05) 0%, transparent 55%)
                        `
                    }}
                />
                
                <div className="absolute inset-0 pointer-events-none">
                    <div 
                        className="absolute top-10 left-5 w-96 h-96 rounded-full blur-3xl opacity-[0.12]"
                        style={{ backgroundColor: '#CD5656' }}
                    />
                    <div 
                        className="absolute bottom-10 right-5 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-[0.10]"
                        style={{ backgroundColor: '#DA6C6C' }}
                    />
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-[0.08]"
                        style={{ backgroundColor: '#AF3E3E' }}
                    />
                    
                    <div 
                        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl opacity-[0.07]"
                        style={{ backgroundColor: '#CD5656' }}
                    />
                    <div 
                        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-2xl opacity-[0.06]"
                        style={{ backgroundColor: '#DA6C6C' }}
                    />
                    
                    <div 
                        className="absolute top-0 left-1/3 w-px h-full opacity-[0.05]"
                        style={{ 
                            background: 'linear-gradient(to bottom, transparent, rgba(205, 86, 86, 0.3), transparent)',
                        }}
                    />
                    <div 
                        className="absolute top-0 right-1/3 w-px h-full opacity-[0.05]"
                        style={{ 
                            background: 'linear-gradient(to bottom, transparent, rgba(218, 108, 108, 0.3), transparent)',
                        }}
                    />
                </div>

                <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(30deg, transparent 40%, rgba(205, 86, 86, 0.1) 50%, transparent 60%),
                            linear-gradient(120deg, transparent 40%, rgba(218, 108, 108, 0.1) 50%, transparent 60%)
                        `,
                        backgroundSize: '200px 200px',
                    }}
                />

                {/* Minimal Top Navigation */}
                <nav className="relative z-20 flex items-center justify-between px-6 py-3 md:px-10 md:py-4 bg-transparent">
                    <Link href="/" className="flex items-center">
                        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-dark via-red to-coral bg-clip-text text-transparent font-outfit">
                            Nexo
                        </span>
                    </Link>
                    
                    <Tooltip 
                        content="Click here for help" 
                        position="bottom"
                    >
                        <button
                            type="button"
                            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:opacity-80 active:scale-95"
                            style={{
                                backgroundColor: 'rgba(205, 86, 86, 0.1)',
                            }}
                            aria-label="Help"
                        >
                            <Info className="w-4 h-4" style={{ color: '#CD5656' }} />
                        </button>
                    </Tooltip>
                </nav>
                
                {/* Separator line */}
                <div 
                    className="relative z-20 w-full"
                    style={{ 
                        height: '2px',
                        backgroundColor: 'rgba(0, 0, 0, 0.06)',
                    }}
                />

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
                        background: 'radial-gradient(circle, rgba(205, 86, 86, 0.15) 0%, rgba(218, 108, 108, 0.08) 40%, transparent 70%)',
                        filter: 'blur(60px)',
                        opacity: 0.6,
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
                        className="flex flex-col gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            <motion.div
                                className="flex justify-center mb-2"
                                variants={itemVariants}
                                initial="hidden"
                                animate={showContent ? "visible" : "hidden"}
                                style={{ 
                                    opacity: showContent ? 1 : 0,
                                    visibility: showContent ? 'visible' : 'hidden'
                                }}
                            >
                                <div 
                                    className="p-3 rounded-xl"
                                    style={{ 
                                        backgroundColor: 'rgba(205, 86, 86, 0.1)',
                                    }}
                                >
                                    <Building2 
                                        className="w-6 h-6 md:w-7 md:h-7"
                                        style={{ color: '#CD5656' }}
                                    />
                                </div>
                            </motion.div>
                            
                            <h1 
                                className="text-3xl font-semibold tracking-tight text-foreground md:text-[42px] min-h-[3rem] md:min-h-[4rem] flex items-center justify-center font-outfit"
                                style={{ wordSpacing: '2px' }}
                            >
                                <TypingText
                                    text="Ready to Join? Let's Build Your Company Profile"
                                    speed={60}
                                    onComplete={handleTypingComplete}
                                />
                            </h1>
                            
                            <motion.p
                                className="text-base text-muted-foreground md:text-lg"
                                variants={itemVariants}
                                initial="hidden"
                                animate={showContent ? "visible" : "hidden"}
                                style={{ 
                                    opacity: showContent ? 1 : 0,
                                    visibility: showContent ? 'visible' : 'hidden'
                                }}
                            >
                                A quick, simple start. We'll tailor the experience
                                based on your company.
                            </motion.p>
                        </div>

                        <motion.div
                            className="flex flex-col gap-8"
                            variants={itemVariants}
                            initial="hidden"
                            animate={showContent ? "visible" : "hidden"}
                            style={{ 
                                opacity: showContent ? 1 : 0,
                                visibility: showContent ? 'visible' : 'hidden'
                            }}
                        >
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-8"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="email"
                                            className="sr-only"
                                        >
                                            Email address
                                        </label>
                                        <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setEmail(e.target.value)
                                        }
                                            placeholder="Email address"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            className="h-12 w-full rounded-xl border px-4 text-base text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-out focus:outline-none focus:ring-0 font-outfit"
                                            style={{
                                                backgroundColor: '#F8F9F3',
                                                borderColor: 'rgba(0, 0, 0, 0.08)',
                                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                                            }}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                                                e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(205, 86, 86, 0.1)';
                                                e.currentTarget.style.transform = 'translateY(-1px)';
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                                e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                            onMouseEnter={(e) => {
                                                if (document.activeElement !== e.currentTarget) {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                                                    e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.05)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (document.activeElement !== e.currentTarget) {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                                    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
                                                }
                                            }}
                                            aria-label="Email address"
                                            aria-invalid={errors.email ? 'true' : 'false'}
                                            aria-describedby={
                                                errors.email
                                                    ? 'email-error'
                                                    : undefined
                                            }
                                        />
                                        {errors.email && (
                                            <p
                                                id="email-error"
                                                className="text-sm text-destructive font-outfit"
                                                role="alert"
                                            >
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="password"
                                            className="sr-only"
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Password"
                                            required
                                            autoComplete="new-password"
                                            className="h-12 w-full rounded-xl border px-4 text-base text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-out focus:outline-none focus:ring-0 font-outfit"
                                            style={{
                                                backgroundColor: '#F8F9F3',
                                                borderColor: 'rgba(0, 0, 0, 0.08)',
                                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                                            }}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                                                e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(205, 86, 86, 0.1)';
                                                e.currentTarget.style.transform = 'translateY(-1px)';
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                                e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                            onMouseEnter={(e) => {
                                                if (document.activeElement !== e.currentTarget) {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                                                    e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.05)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (document.activeElement !== e.currentTarget) {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                                    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
                                                }
                                            }}
                                            aria-label="Password"
                                            aria-invalid={errors.password ? 'true' : 'false'}
                                            aria-describedby={
                                                errors.password
                                                    ? 'password-error'
                                                    : undefined
                                            }
                                        />
                                        {errors.password && (
                                            <p
                                                id="password-error"
                                                className="text-sm text-destructive font-outfit"
                                                role="alert"
                                            >
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="h-12 w-full rounded-lg text-white text-base font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer flex items-center justify-center gap-2 font-outfit"
                                    style={{ 
                                        backgroundColor: processing ? '#AF3E3E' : '#CD5656',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!processing) {
                                            e.currentTarget.style.backgroundColor = '#AF3E3E';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!processing) {
                                            e.currentTarget.style.backgroundColor = '#CD5656';
                                        }
                                    }}
                                >
                                    {processing && (
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
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
                                    )}
                                    <span className="font-outfit">Continue</span>
                                </button>
                            </form>

                            <div className="relative flex items-center gap-4 mt-2">
                                <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }} />
                                <span className="text-sm text-muted-foreground font-outfit">
                                    or continue with
                                </span>
                                <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }} />
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => handleOAuthRedirect('google')}
                                    className="flex h-12 flex-1 items-center justify-center rounded-lg border text-base font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm cursor-pointer font-outfit"
                                    style={{ 
                                        borderColor: '#CD5656',
                                        backgroundColor: 'transparent',
                                        color: '#CD5656',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#CD5656';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#CD5656';
                                    }}
                                >
                                    <SiGoogle
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    <span className="font-outfit">Google</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleOAuthRedirect('microsoft')}
                                    className="flex h-12 flex-1 items-center justify-center rounded-lg border text-base font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm cursor-pointer font-outfit"
                                    style={{ 
                                        borderColor: '#CD5656',
                                        backgroundColor: 'transparent',
                                        color: '#CD5656',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#CD5656';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#CD5656';
                                    }}
                                >
                                    <FaMicrosoft
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    <span className="font-outfit">Microsoft</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
                </div>
            </div>
        </>
    );
}

