'use client'

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    auth: any;
    setAuth: any;
    // persist: any;
    // setPersist: any;
}

export const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [auth, setAuth] = useState({});
    // const persistedValue = localStorage.getItem("persist");
    // const initialPersistState = persistedValue ? JSON.parse(persistedValue) : false;

    // const [persist, setPersist] = useState<boolean>(initialPersistState);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

