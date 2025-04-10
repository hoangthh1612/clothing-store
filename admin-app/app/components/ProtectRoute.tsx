'use client'

import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

const ProtectRoute = ({children}: {children: any}) => {
    useEffect(() => {
        if (typeof window !== undefined && window.localStorage){
            const userData = JSON.parse(localStorage.getItem('userInfo') || '{}');
            if(!userData.isSeller) redirect('/seller/onboarding');
        }
    }, [])
    return children;
}

export default ProtectRoute