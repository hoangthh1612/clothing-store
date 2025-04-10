
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken"

import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { axiosPrivate } from "../api/axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    if(!localStorage.getItem('accessToken')) {
        throw new Error('No access token')
    }
    const accessToken = localStorage.getItem('accessToken')?.toString();
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if(!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${accessToken?.substring(1, accessToken.length - 1)}`;
                }
                return config;
            }, (error) => Promise.reject(error)

        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response, 
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        )
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }
    },[auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;