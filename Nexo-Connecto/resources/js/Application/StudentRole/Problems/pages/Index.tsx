import React from 'react';
import StudentLayout from '@/layouts/student-layout';
import StudentNavBar from '@/Application/StudentRole/components/StudentNavBar';
import WelcomeOverlay from '@/components/WelcomeOverlay';
import { Head } from '@inertiajs/react';

const Index = () => {
    const [showWelcome, setShowWelcome] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <StudentLayout>
            <Head title="Problems" />
            <WelcomeOverlay
                show={showWelcome}
                title="Problems To Solve"
                subtitle="Setting up your personalized experience..."
            />

            {!showWelcome && (
                <div className="min-h-screen bg-[#f5f2ed]">
                    <StudentNavBar />
                    
                    <main className="w-full px-8 py-8">
                        <div className="w-full max-w-7xl mx-auto">
                            <h1 className="text-2xl font-outfit font-bold text-gray-800 mb-6">
                                Challenges & Problems
                            </h1>
                            
                            {/* Your problem categories and list will go here */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse">
                                    <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
                                    <div className="h-8 bg-gray-50 rounded w-3/4"></div>
                                </div>
                                {/* More skeleton loaders... */}
                            </div>
                        </div>
                    </main>

                </div>
            )}
        </StudentLayout>
    )
}

export default Index;