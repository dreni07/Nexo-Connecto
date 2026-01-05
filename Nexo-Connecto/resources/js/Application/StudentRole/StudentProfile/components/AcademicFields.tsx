import React, { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import type { SpecificMajor } from '../requests';
import { getSpecificMajors } from '../requests';
import { DegreeLevel } from '../types/DegreeLevel';
import { useProfileProgress } from '../context/ProfileProgressContext';
import CustomSelect from './CustomSelect';

interface AcademicFieldsProps {
    universityId: number | null;
    onFieldsChange: (fields: {
        majorId: number | null;
        degreeLevel: DegreeLevel | '';
        academicYear: number | '';
    }) => void;
}

export default function AcademicFields({ universityId, onFieldsChange }: AcademicFieldsProps) {
    const { setHasMajor, setHasDegreeLevel, setHasAcademicYear } = useProfileProgress();
    const [majors, setMajors] = useState<SpecificMajor[]>([]);
    const [loadingMajors, setLoadingMajors] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
    const [degreeLevel, setDegreeLevel] = useState<DegreeLevel | ''>('');
    const [academicYear, setAcademicYear] = useState<number | ''>('');

    useEffect(() => {
        if (universityId) {
            setLoadingMajors(true);
            getSpecificMajors(universityId)
                .then((response) => {
                    if (response.success) {
                        setMajors(response.majors);
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch majors:', error);
                    setMajors([]);
                })
                .finally(() => {
                    setLoadingMajors(false);
                });
        } else {
            setMajors([]);
            setSelectedMajor(null);
            setDegreeLevel('');
            setAcademicYear('');
        }
    }, [universityId]);

    useEffect(() => {
        setHasMajor(selectedMajor !== null);
    }, [selectedMajor, setHasMajor]);

    useEffect(() => {
        setHasDegreeLevel(degreeLevel !== '');
    }, [degreeLevel, setHasDegreeLevel]);

    useEffect(() => {
        setHasAcademicYear(academicYear !== '');
    }, [academicYear, setHasAcademicYear]);

    useEffect(() => {
        onFieldsChange({
            majorId: selectedMajor,
            degreeLevel,
            academicYear,
        });
    }, [selectedMajor, degreeLevel, academicYear, onFieldsChange]);

    const handleMajorChange = (value: string | number | null) => {
        setSelectedMajor(value === null ? null : Number(value));
        setDegreeLevel('');
        setAcademicYear('');
    };

    const handleDegreeLevelChange = (value: string | number | null) => {
        setDegreeLevel(value as DegreeLevel | '');
        setAcademicYear('');
    };

    const handleAcademicYearChange = (value: string | number | null) => {
        setAcademicYear(value === null ? '' : Number(value));
    };

    const majorOptions = useMemo(() => 
        majors.map(major => ({
            value: major.id,
            label: major.name,
        })), 
        [majors]
    );

    const degreeLevelOptions = useMemo(() => [
        { value: DegreeLevel.BACHELOR, label: 'Bachelor' },
        { value: DegreeLevel.MASTERS, label: 'Masters' },
        { value: DegreeLevel.PHD, label: 'PhD' },
    ], []);

    const academicYearOptions = useMemo(() => 
        [1, 2, 3, 4, 5, 6].map(year => ({
            value: year,
            label: `Year ${year}`,
        })),
        []
    );

    if (!universityId) {
        return null;
    }

    return (
        <div className="flex flex-col gap-6">
            {loadingMajors && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-outfit">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading majors...</span>
                </div>
            )}

            {!loadingMajors && majors.length > 0 && (
                <CustomSelect
                    options={majorOptions}
                    selectedValue={selectedMajor}
                    onValueChange={handleMajorChange}
                    label="Major"
                    placeholder="Select a major"
                    searchable={true}
                    searchPlaceholder="Search majors..."
                />
            )}

            {selectedMajor && (
                <CustomSelect
                    options={degreeLevelOptions}
                    selectedValue={degreeLevel}
                    onValueChange={handleDegreeLevelChange}
                    label="Degree Level"
                    placeholder="Select degree level"
                />
            )}

            {degreeLevel && (
                <CustomSelect
                    options={academicYearOptions}
                    selectedValue={academicYear}
                    onValueChange={handleAcademicYearChange}
                    label="Academic Year"
                    placeholder="Select year"
                />
            )}
        </div>
    );
}

