import React from 'react';
import { Head } from '@inertiajs/react';
import { DashboardProvider } from '../context/DashboardContext';
import Sidebar from '../components/Sidebar';
import WelcomeCard from '../components/WelcomeCard';
import PrimaryCTA from '../components/PrimaryCTA';
import QuickActionsBar from '../components/QuickActionsBar';
import StudentMatchSnapshot from '../components/StudentMatchSnapshot';
import CompanyIdentityCard from '../components/CompanyIdentityCard';
import TodayImpactCard from '../components/TodayImpactCard';
import WeeklyPerformance from '../components/WeeklyPerformance';
import InsightsSection from '../components/InsightsSection';
import LivePreviewPanel from '../components/LivePreviewPanel';
import EmptyState from '../components/EmptyState';

export default function CompanyDashboard() {
    return (
        <DashboardProvider>
            <Head title="Company Dashboard" />
            <div 
                className="flex min-h-screen"
                style={{ 
                    background: 'linear-gradient(to bottom, #F7F5F2 0%, #F4F5ED 100%)'
                }}
            >
                <Sidebar />
                
                <main className="flex-1 ml-64 p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Title */}
                        <div className="mb-8">
                            <h1 
                                className="text-3xl font-semibold mb-2 font-outfit"
                                style={{ color: '#2A2A2A' }}
                            >
                                Dashboard
                            </h1>
                            <p 
                                className="text-base font-outfit"
                                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                            >
                                Here's what's happening with your company today.
                            </p>
                        </div>

                        {/* Top Banner */}
                        <PrimaryCTA />

                        {/* Top Section: Welcome Card & Quick Actions */}
                        <div className="mb-10">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                                <div className="lg:col-span-2 space-y-6">
                                    <WelcomeCard />
                                    <WeeklyPerformance />
                                </div>
                                <div className="flex h-full w-full">
                                    <QuickActionsBar />
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div>
                                    <StudentMatchSnapshot />
                                </div>
                                <div>
                                    <CompanyIdentityCard />
                                </div>
                                <div>
                                    <TodayImpactCard />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <InsightsSection />
                                <EmptyState />
                            </div>
                            <div>
                                <LivePreviewPanel />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </DashboardProvider>
    );
}
