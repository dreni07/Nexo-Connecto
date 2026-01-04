import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
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
import { register } from './requests';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
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

        if (!agreedToTerms) {
            setNotification({
                type: 'fail',
                message: 'Please agree to the terms and conditions.',
            });
            setProcessing(false);
            return;
        }

        if (password !== confirmPassword) {
            setNotification({
                type: 'fail',
                message: 'Passwords do not match.',
            });
            setProcessing(false);
            return;
        }

        if (password.length < 8) {
            setNotification({
                type: 'fail',
                message: 'Password must be at least 8 characters long.',
            });
            setProcessing(false);
            return;
        }

        try {
            const result = await register({
                username,
                email,
                password,
                role: 1,
            });

            if (result.success) {
                if (result.user?.email_verified_at) {
                    if (!result.hasProfile) {
                        if (result.user?.role === 'company') {
                            router.visit('/company/create-profile', {
                                method: 'get',
                            });
                        } else if (result.user?.role === 'student') {
                            router.visit('/student/create-profile', {
                                method: 'get',
                            });
                        } else {
                            router.visit('/verify', {
                                method: 'get',
                            });
                        }
                    } else {
                        if (result.user?.role === 'company') {
                            router.visit('/company/dashboard', {
                                method: 'get',
                            });
                        } else if (result.user?.role === 'student') {
                            router.visit('/student/dashboard', {
                                method: 'get',
                            });
                        } else {
                            router.visit('/verify', {
                                method: 'get',
                            });
                        }
                    }
                } else {
                    router.visit('/verify', {
                        method: 'get',
                    });
                }
            } else {
                setNotification({
                    type: 'fail',
                    message: result.message || 'Failed to create account. Please try again.',
                });
            }
        } catch (error) {
            setNotification({
                type: 'fail',
                message: error instanceof Error ? error.message : 'Failed to create account. Please try again.',
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <Head title="Register" />
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
                                        <UserPlus 
                                            className="w-6 h-6 md:w-7 md:h-7"
                                            style={{ color: '#CD5656' }}
                                        />
                                    </div>
                                </motion.div>
                                
                                <motion.h1 
                                    className="text-4xl font-semibold tracking-tight text-foreground md:text-[48px] font-outfit"
                                    variants={itemVariants}
                                >
                                    Create Account
                                </motion.h1>
                                
                                <motion.p
                                    className="text-lg text-muted-foreground md:text-md font-outfit"
                                    variants={itemVariants}
                                >
                                    Enter your details to create your account
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
                                            id="username"
                                            name="username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Username"
                                            autoComplete="username"
                                            autoFocus
                                            ariaLabel="Username"
                                        />
                                        <InputAuthField
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            autoComplete="email"
                                            ariaLabel="Email address"
                                        />
                                        <InputAuthField
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            ariaLabel="Password"
                                        />
                                        <InputAuthField
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm Password"
                                            autoComplete="new-password"
                                            ariaLabel="Confirm Password"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 text-red focus:ring-red focus:ring-2 cursor-pointer"
                                            style={{
                                                accentColor: '#CD5656',
                                            }}
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm text-foreground cursor-pointer font-outfit"
                                        >
                                            Agree to our{' '}
                                            <a
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                                className="underline hover:no-underline transition-all"
                                                style={{ color: '#CD5656' }}
                                            >
                                                terms and conditions
                                            </a>
                                        </label>
                                    </div>

                                    <OrDivider />
                                    <OAuthButtons />
                                    <AuthSubmitButton 
                                        text="Create Account" 
                                        processing={processing} 
                                        disabled={!agreedToTerms}
                                    />
                                </form>
                                <AuthLink action={Action.Register} navigateTo="/login" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}




