// components/Loading.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import AuthService from "@/services/auth/Auth.service";
import "../../../../public-dashboard/assets/css/loading.css";

function Loading() {
    if (!AuthService.checkAuth()) {
        const router = useRouter();
        
        useEffect(() => {
            router.push('/');
        }, [router]);
    }

    return (
        <div className="splash-loaging">
            <div className="wrapper">
                <div>
                    <img src="/assets/images/logo/fav.png" alt="logo" />
                </div>
                <h3 className="title animated fadeIn">Constructora Rojas y Reyes</h3>
                <h2 className="autor">WASSM</h2>
            </div>
        </div>
    );
}

export default Loading;