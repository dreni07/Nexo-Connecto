import React,{useState,useEffect,createContext} from 'react';
import { Head } from '@inertiajs/react';
import StudentNavBar from '../components/StudentNavBar';
import ProgressTracker from '../components/ProgressTracker';
import LetsConnect from '../components/LetsConnect';
import UnlockFeatures from '../components/UnlockFeatures';
import YourProjects from '../components/YourProjects';
import ProposalProgress from '../components/ProposalProgress';

interface UserDetails {
    name:string;
    email:string;
    avatar?:string;
}

interface IndexProps {
    user_details: UserDetails;
}

export const StudentDashboardContext = createContext<UserDetails | undefined>(undefined);

const Index = ({ user_details }: IndexProps) => {
    return (
        <StudentDashboardContext.Provider value={user_details}>
            <Head title="Student Dashboard" />
            <div 
                className="min-h-screen"
                style={{
                    background: 'linear-gradient(to bottom, #F7F5F2 0%, #F4F5ED 100%)',
                }}
            >
                <StudentNavBar />
                
                <main className="w-full px-8 py-8">
                    <div className="w-full max-w-full mx-auto">
                        {/* Main Content Grid with explicit rows for equal heights - ~54% left, ~46% right (7.5% difference) */}
                        <div className="grid grid-cols-1 lg:grid-cols-24 gap-6 items-stretch" style={{ gridTemplateRows: '1fr auto' }}>
                            {/* First Row: Progress Tracker and Your Recent Projects - Same height */}
                            <div className="lg:col-span-13" style={{ gridRow: '1' }}>
                                <ProgressTracker />
                            </div>
                            <div className="lg:col-span-11" style={{ gridRow: '1' }}>
                                <YourProjects />
                            </div>

                            {/* Second Row: Let's Connect, Unlock Features, and Proposal Progress */}
                            <div className="lg:col-span-13 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch" style={{ gridRow: '2' }}>
                                <LetsConnect />
                                <UnlockFeatures />
                            </div>
                            <div className="lg:col-span-11" style={{ gridRow: '2' }}>
                                <ProposalProgress />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </StudentDashboardContext.Provider>
    )
}

export default Index;