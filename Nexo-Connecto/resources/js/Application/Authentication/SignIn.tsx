import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { useMousePosition } from '@/hooks/useMousePosition';
import Notification, { NotificationType } from '../Notification';
import AuthNavigation from './components/AuthNavigation';
import AuthBackground from './components/AuthBackground';
import OrDivider from './components/OrDivider';
import OAuthButtons from './components/OAuthButtons';
import AuthSubmitButton from './components/AuthSubmitButton';
import InputAuthField from './components/InputAuthField';
import AuthLink, { Action } from './components/AuthLink';
import { containerVariants, itemVariants } from './config-auth';
import { login } from './requests';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);
    const [notification, setNotification] = useState<{
        type: NotificationType;
        message: string;
    } | null>(null);
    
    const mousePosition = useMousePosition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setNotification(null);

        try {
            const result = await login({
                email,
                password,
            });

            if (result.success) {
                if (result.user?.email_verified_at) {
                    // Redirect to dashboard (middleware will handle profile check)
                    if (result.user?.role === 'company') {
                        router.visit('/company/dashboard', {
                            method: 'get',
                        });
                    } else if (result.user?.role === 'student') {
                        router.visit('/student/dashboard', {
                            method: 'get',
                        });
                    } else {
                        router.visit('/company/dashboard', {
                            method: 'get',
                        });
                    }
                } else {
                    router.visit('/verify', {
                        method: 'get',
                    });
                }
            } else {
                setNotification({
                    type: 'fail',
                    message: result.message || 'Failed to sign in. Please try again.',
                });
            }
        } catch (error) {
            setNotification({
                type: 'fail',
                message: error instanceof Error ? error.message : 'Failed to sign in. Please try again.',
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <Head title="Sign In" />
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                    position="top-right"
                />
            )}
            <div className="relative flex min-h-svh flex-col overflow-hidden" style={{ backgroundColor: '#F4F5ED' }}>
                <AuthBackground />
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
                        className="relative z-10 w-full max-w-sm"
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
                                        <LogIn 
                                            className="w-6 h-6 md:w-7 md:h-7"
                                            style={{ color: '#CD5656' }}
                                        />
                                    </div>
                                </motion.div>
                                
                                <motion.h1 
                                    className="text-4xl font-semibold tracking-tight text-foreground md:text-[48px] font-outfit"
                                    variants={itemVariants}
                                >
                                    Sign In
                                </motion.h1>
                                
                                <motion.p
                                    className="text-lg text-muted-foreground md:text-md font-outfit"
                                    variants={itemVariants}
                                >
                                    Enter your email and password to sign in
                                </motion.p>
                            </div>

                            <motion.div
                                className="flex flex-col gap-6"
                                variants={itemVariants}
                            >
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="flex flex-col gap-4">
                                        <InputAuthField
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            autoComplete="email"
                                            autoFocus
                                            ariaLabel="Email address"
                                        />
                                        <InputAuthField
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            ariaLabel="Password"
                                        />
                                    </div>

                                    <OrDivider />
                                    <OAuthButtons />
                                    <AuthSubmitButton 
                                        text="Sign In" 
                                        processing={processing} 
                                    />
                                </form>
                                <AuthLink action={Action.SignIn} navigateTo="/register" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

