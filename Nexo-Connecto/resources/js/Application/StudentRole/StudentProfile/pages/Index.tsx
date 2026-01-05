import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import ProfileBackground from '../components/ProfileBackground';
import ProgressBar from '../components/ProgressBar';
import Step1TellStory from '../components/Step1TellStory';
import Step2AcademicInfo from '../components/Step2AcademicInfo';
import { ProfileProgressProvider, useProfileProgress } from '../context/ProfileProgressContext';
import LoadingScreen from '../../../../components/LoadingScreen';
import CustomModal from '../../../../components/Modal';
import Controls from '../components/Controls';
import UndoButton from '../components/UndoButton';
import YearTabs from '../components/YearTabs';
import ClassCard from '../components/ClassCard';
import ContextMenu from '../components/ContextMenu';
import { ControlStatus } from '../config/controlsConfig';
import { getCourseSubjects, saveStudentProfile } from '../requests';
import type { University, CourseSubject } from '../requests';

interface IndexProps {
    universities: University[];
}

type Step = 1 | 2 | 3;

const ProfileForm = ({ universities }: { universities: University[] }) => {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [bio, setBio] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allSubjects, setAllSubjects] = useState<Record<number, CourseSubject[]>>({});
    
    const [activeYearTab, setActiveYearTab] = useState<number>(1);
    const [maxYear, setMaxYear] = useState<number>(1);
    const [activeControl, setActiveControl] = useState<ControlStatus>(null);

    const [academicInfo, setAcademicInfo] = useState<{
        universityId: number;
        specificMajorId: number;
        degreeLevel: string;
        academicYear: number;
    } | null>(null);

    const [subjectStatuses, setSubjectStatuses] = useState<Record<string, ControlStatus>>({});
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, control: Exclude<ControlStatus, null>, label: string } | null>(null);

    const { progress, setHasAvatar, setHasBio } = useProfileProgress();

    const handleAvatarChange = (file: File | null) => {
        setAvatar(file);
        setHasAvatar(file !== null);
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.target.value;
        setBio(value);
        setHasBio(value.trim().length > 0);
    };

    const handleStep1Next = () => {
        setCurrentStep(2);
    };

    const handleStep2Next = async (data: {
        universityId: number;
        specificMajorId: number;
        degreeLevel: string;
        academicYear: number;
    }) => {
        setIsLoading(true);
        setAcademicInfo(data);
        setMaxYear(data.academicYear);
        setActiveYearTab(1); 
        
        try {
            const subjectsByYear: Record<number, CourseSubject[]> = {};
            const fetchPromises = [];

            for (let year = 1; year <= data.academicYear; year++) {
                fetchPromises.push(
                    getCourseSubjects(data.specificMajorId, year).then(response => {
                        if (response.success && response.subjects) {
                            subjectsByYear[year] = response.subjects;
                        }
                    })
                );
            }

            await Promise.all(fetchPromises);
            setAllSubjects(subjectsByYear);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching course subjects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubjectClick = (subjectName: string) => {
        if (!activeControl) return;

        setSubjectStatuses(prev => {
            const currentStatus = prev[subjectName];

            if (currentStatus === activeControl) {
                const newStatuses = { ...prev };
                delete newStatuses[subjectName];
                return newStatuses;
            }

            // nese domethane active control ka ndryshu
            // athere na e ndryshojm statusin e klases
            return {
                ...prev,
                [subjectName]: activeControl
            };
        });
    };

    const handleRightClick = (e: React.MouseEvent, control: Exclude<ControlStatus, null>, label: string) => {
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            control,
            label
        });
    };

    const handleMarkAll = (control: ControlStatus) => {
        if (!control || !allSubjects[activeYearTab]) return;

        const newStatuses = { ...subjectStatuses };
        allSubjects[activeYearTab].forEach(subject => {
            newStatuses[subject.name] = control;
        });
        setSubjectStatuses(newStatuses);
    };

    const handleConfirmClasses = async () => {
        if (!academicInfo) return;

        const formattedData: Record<string, string[]> = {
            finished: [],
            taking: [],
            not_taking: []
        };

        Object.entries(subjectStatuses).forEach(([name, status]) => {
            if (status && formattedData[status]) {
                // domethane te statusi i caktum 
                // mundesh me bo push "name" qe osht klasa te cilen e kemi zgjedhur me ate status
                // te caktuar
                formattedData[status].push(name);
            }
        });

        setIsLoading(true);
        try {
            const response = await saveStudentProfile({
                avatar,
                bio,
                specific_major: academicInfo.specificMajorId,
                degree_level: academicInfo.degreeLevel,
                academic_year: academicInfo.academicYear,
                subjects_choosen: formattedData
            });

            if (response.success) {
                setIsModalOpen(false);
                setIsLoading(true);
                setTimeout(() => {
                    router.visit('/student/dashboard?completed=true');
                }, 2000);
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            // Optionally show error message to user
            setIsLoading(false);
        }
    };

    const handleUndoCurrentTab = () => {
        if (!allSubjects[activeYearTab]) return;
        
        const subjectNamesInTab = allSubjects[activeYearTab].map(s => s.name);
        setSubjectStatuses(prev => {
            const next = { ...prev };
            subjectNamesInTab.forEach(name => delete next[name]);
            return next;
        });
    };

    const hasSelectionsInCurrentTab = allSubjects[activeYearTab]?.some(
        subject => subjectStatuses[subject.name]
    ) ?? false;

    return (
        <>
            <AnimatePresence mode="wait">
                <LoadingScreen isVisible={isLoading} />
            </AnimatePresence>

            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    label={contextMenu.label}
                    onClose={() => setContextMenu(null)}
                    onMarkAll={() => handleMarkAll(contextMenu.control)}
                />
            )}

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Course Classes"
                maxWidth="900px"
                className="modal-content !bg-[#F4F5ED]"
            >
                <div className="flex flex-col h-[70vh]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 flex-shrink-0">
                        <p className="text-gray-600 font-outfit text-sm md:text-base">
                            Select a status below, then click on the classes to mark them appropriately.
                        </p>
                        
                        <UndoButton 
                            onClick={handleUndoCurrentTab} 
                            hasSelections={hasSelectionsInCurrentTab} 
                        />
                    </div>
                    
                    <div className="flex-shrink-0 mb-4">
                        <Controls 
                            activeControl={activeControl} 
                            onControlChange={setActiveControl} 
                            onRightClick={handleRightClick}
                        />
                    </div>

                    <YearTabs 
                        maxYear={maxYear} 
                        activeYearTab={activeYearTab} 
                        onTabChange={setActiveYearTab} 
                    />

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
                        {allSubjects[activeYearTab] && allSubjects[activeYearTab].length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                                {allSubjects[activeYearTab].map((subject, index) => (
                                    <ClassCard
                                        key={index}
                                        name={subject.name}
                                        status={subjectStatuses[subject.name]}
                                        onClick={() => handleSubjectClick(subject.name)}
                                        activeControl={activeControl}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-outfit text-lg italic">No classes found for this year.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200/50 flex-shrink-0">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-medium hover:bg-white hover:text-gray-700 transition-all font-outfit cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmClasses}
                            className="px-8 py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg active:scale-95 font-outfit cursor-pointer"
                        >
                            Confirm Classes
                        </button>
                    </div>
                </div>
            </CustomModal>

            <ProgressBar progress={progress} />

            <div 
                className="relative flex min-h-svh flex-col overflow-hidden"
                style={{ backgroundColor: '#F4F5ED' }}
            >
                <ProfileBackground />

                <div className="relative z-10 flex flex-1 items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-2xl">
                        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-md border border-white/30">
                            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-outfit">
                                Create Your Profile
                            </h1>

                            {currentStep === 1 && (
                                <Step1TellStory
                                    avatar={avatar}
                                    bio={bio}
                                    onAvatarChange={handleAvatarChange}
                                    onBioChange={handleBioChange}
                                    onNext={handleStep1Next}
                                />
                            )}

                            {currentStep === 2 && (
                                <Step2AcademicInfo
                                    universities={universities}
                                    onNext={handleStep2Next}
                                    onBack={() => setCurrentStep(1)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Index = ({ universities }: IndexProps) => {
    return (
        <>
            <Head title="Create Profile" />
            <ProfileProgressProvider>
                <ProfileForm universities={universities} />
            </ProfileProgressProvider>
        </>
    );
};

export default Index;
