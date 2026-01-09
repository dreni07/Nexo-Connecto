import { 
    User, 
    Briefcase, 
    Target, 
    Zap, 
    Bell, 
    ExternalLink, 
    ShieldCheck, 
    Lock, 
    Eye, 
    Globe, 
    LifeBuoy, 
    FileText 
} from 'lucide-react';
import React from 'react';

export interface SettingItem {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    badge?: string;
}

export interface SettingGroup {
    id: string;
    title: string;
    icon: React.ElementType;
    items: SettingItem[];
}

export const groupData: SettingGroup[] = [
    { 
        id: 'career', 
        title: 'Career Profile', 
        icon: User,
        items: [
            { id: 'personal-info', title: 'Personal Information', description: 'Your profile photo, name, and basic contact details', icon: User },
            { id: 'work-exp', title: 'Work Experience', description: 'Professional history, roles, and major achievements', icon: Briefcase },
            { id: 'career-goals', title: 'Career Goals', description: 'Your future objectives and desired professional path', icon: Target },
        ]
    },
    { 
        id: 'progress', 
        title: 'Progress & Signals', 
        icon: Zap,
        items: [
            { id: 'skill-assessments', title: 'Skill Assessments', description: 'Verify your expertise with industry-standard tests', icon: Zap, badge: 'Beta' },
            { id: 'notifications', title: 'Notification Settings', description: 'Configure how and when you receive updates', icon: Bell },
            { id: 'external-signals', title: 'External Signals', description: 'Link your GitHub, LinkedIn, or Behance profiles', icon: ExternalLink },
        ]
    },
    { 
        id: 'account', 
        title: 'Account & Security', 
        icon: ShieldCheck,
        items: [
            { id: 'login-security', title: 'Login & Security', description: 'Update password and manage two-factor authentication', icon: ShieldCheck },
            { id: 'account-access', title: 'Account Access', description: "View and manage devices where you're signed in", icon: Lock },
        ]
    },
    { 
        id: 'privacy', 
        title: 'Privacy & Transparency', 
        icon: Eye,
        items: [
            { id: 'profile-visibility', title: 'Profile Visibility', description: 'Choose who can view your profile and recent activity', icon: Eye },
            { id: 'data-privacy', title: 'Data & Privacy', description: 'Manage your data exports and privacy preferences', icon: Globe },
        ]
    },
    { 
        id: 'support', 
        title: 'Support & Legal', 
        icon: LifeBuoy,
        items: [
            { id: 'help-support', title: 'Help & Support', description: 'Browse help articles or contact our support team', icon: LifeBuoy },
            { id: 'terms-policies', title: 'Terms & Policies', description: 'Review our Terms of Service and Privacy Policy', icon: FileText },
        ]
    },
];

