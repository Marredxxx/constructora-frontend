// app/dashboard/page.tsx
"use client";
import { useState } from 'react';
import SideLeft from "../components/SideLeft";
import Header from "../components/Header";
import DemoContent from "./DemoContent";
import AuthService from '@/services/auth/Auth.service';
import Loading from '../components/Loading';

export default function Home() {
    if (!AuthService.checkAuth()) {
        return (<Loading />);
    }

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="ekomart_dashboard">
            <SideLeft collapsed={sidebarCollapsed} />
            <div className={`right-area-body-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <Header onToggleSidebar={toggleSidebar} />
                <DemoContent />
            </div>
        </div>
    );
}