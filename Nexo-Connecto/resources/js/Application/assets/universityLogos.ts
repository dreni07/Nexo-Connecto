import universitetiPrishtines from './universities/universiteti_prishtines.png';

export const universityLogos: Record<string, string> = {
    'universiteti_prishtines': universitetiPrishtines,
};


export const getUniversityLogo = (logoName: string | null | undefined): string | undefined => {
    if (!logoName) {
        return undefined;
    }
    return universityLogos[logoName];
};



