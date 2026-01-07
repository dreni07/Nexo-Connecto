import React,{useState,useEffect,useContext} from 'react';
import  NexoLogo from '@/components/NexoLogo';
import Items from './Items';
import NotificationButton from '../../components/NotificationButton';
import ConnectionButton from '../../components/ConnectionButton';
import ProfileButton from '../../components/ProfileButton';
import SearchBar from '../../components/SearchBar';
import { StudentDashboardContext } from '../pages/Index';

const StudentNavBar = () => {
    const user = useContext(StudentDashboardContext);
    return (
        <>
            <nav className="w-full h-[100px] flex justify-between items-center">
                <div className="flex-shrink-0 pl-8">
                    <NexoLogo size="lg" font="outfit" />
                </div>

                <div className="flex gap-4 pr-8">
                    <Items />
                </div>

                <div className="flex items-center gap-4 pr-8">
                    <SearchBar />
                    
                    <ConnectionButton 
                        onClick={() => {
                            console.log('Connections clicked');
                        }}
                        hasNewConnections={false}
                    />

                    <NotificationButton 
                        onClick={() => {
                            console.log('Notifications clicked');
                        }}
                        hasNotifications={false}
                    />

                    <ProfileButton avatar={user?.avatar} />
                </div>
            </nav>
        </>
    )
};

export default StudentNavBar;