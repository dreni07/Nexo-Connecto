export type ControlStatus = 'finished' | 'taking' | 'not_taking' | null;

export const CONTROLS_CONFIG = [
    {
        id: 'finished' as const,
        label: 'Finished',
        color: 'bg-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        activeBg: 'bg-green-100'
    },
    {
        id: 'taking' as const,
        label: 'Currently Taking',
        color: 'bg-yellow-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-700',
        activeBg: 'bg-yellow-100'
    },
    {
        id: 'not_taking' as const,
        label: 'Not Taking',
        color: 'bg-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
        activeBg: 'bg-red-100'
    }
] as const;

export const getStatusStyles = (status: ControlStatus) => {
    switch (status) {
        case 'finished':
            return 'bg-green-50 border-green-200 text-green-800 opacity-80 border-2 shadow-sm';
        case 'taking':
            return 'bg-yellow-50 border-yellow-200 text-yellow-800 opacity-80 border-2 shadow-sm';
        case 'not_taking':
            return 'bg-red-50 border-red-200 text-red-800 opacity-80 border-2 shadow-sm';
        default:
            return 'bg-white border-gray-100 text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-sm border-2';
    }
};

