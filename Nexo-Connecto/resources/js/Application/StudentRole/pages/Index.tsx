import React,{useState,useEffect,createContext} from 'react';
import StudentNavBar from '../components/StudentNavBar';

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
            <div className="min-h-screen bg-[#f5f2ed]">
                <StudentNavBar />
            </div>
        </StudentDashboardContext.Provider>
    )
}

export default Index;