import React, { useState, useCallback } from 'react';
import type { University } from '../requests';
import { DegreeLevel } from '../types/DegreeLevel';
import UniversitySearch from './UniversitySearch';
import AcademicFields from './AcademicFields';

interface Step2AcademicInfoProps {
    universities: University[];
    onNext: (data: {
        universityId: number;
        specificMajorId: number;
        degreeLevel: string;
        academicYear: number;
    }) => void;
    onBack?: () => void;
}

export default function Step2AcademicInfo({ universities, onNext, onBack }: Step2AcademicInfoProps) {
    const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
    const [academicFields, setAcademicFields] = useState<{
        majorId: number | null;
        degreeLevel: DegreeLevel | '';
        academicYear: number | '';
    }>({
        majorId: null,
        degreeLevel: '',
        academicYear: '',
    });

    const handleFieldsChange = useCallback((fields: {
        majorId: number | null;
        degreeLevel: DegreeLevel | '';
        academicYear: number | '';
    }) => {
        setAcademicFields(fields);
    }, []);

    const handleNext = () => {
        if (
            selectedUniversity &&
            academicFields.majorId &&
            academicFields.degreeLevel &&
            academicFields.academicYear
        ) {
            onNext({
                universityId: selectedUniversity.id,
                specificMajorId: academicFields.majorId,
                degreeLevel: academicFields.degreeLevel,
                academicYear: Number(academicFields.academicYear),
            });
        }
    };

    const canProceed =
        selectedUniversity !== null &&
        academicFields.majorId !== null &&
        academicFields.degreeLevel !== '' &&
        academicFields.academicYear !== '';

    return (
        <div className="flex flex-col gap-8">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2 font-outfit">
                Academic Information
            </h2>

            <UniversitySearch
                universities={universities}
                onUniversitySelect={setSelectedUniversity}
                selectedUniversity={selectedUniversity}
            />

            <AcademicFields
                universityId={selectedUniversity?.id ?? null}
                onFieldsChange={handleFieldsChange}
            />

            <div className="flex justify-between items-center mt-4 gap-4">
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="h-11 px-8 rounded-lg text-base font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md cursor-pointer font-outfit"
                        style={{
                            backgroundColor: '#F8F9F3',
                            color: '#333',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#ECEDE1';
                            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#F8F9F3';
                            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                        }}
                    >
                        Back
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`h-11 px-8 rounded-lg text-white text-base font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md cursor-pointer font-outfit disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${onBack ? 'ml-auto' : ''}`}
                    style={{ 
                        backgroundColor: canProceed ? '#CD5656' : '#999',
                    }}
                    onMouseEnter={(e) => {
                        if (canProceed) {
                            e.currentTarget.style.backgroundColor = '#AF3E3E';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (canProceed) {
                            e.currentTarget.style.backgroundColor = '#CD5656';
                        }
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
