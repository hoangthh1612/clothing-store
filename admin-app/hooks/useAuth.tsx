'use client'

import { AuthContext } from "@/Context/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error(
            "Errr"
        )
    }
    return context;
}