

import axios from "../api/axios";
import useAuth from "./useAuth"

 

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        if(!localStorage.getItem('refreshToken')) {
            throw new Error('No refresh token')
        }
        
        const refreshToken = localStorage.getItem('refreshToken');
        
        const res = await axios.post('/auth/refresh', {
            refreshToken: refreshToken?.substring(1, refreshToken.length - 1)
        }, {
            withCredentials: true
        });
        
        localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
        setAuth((pre) => {
            
            return {...pre, accessToken: res.data.accessToken}
        })
        return res.data.accessToken;
    }
    return refresh;

}

export default useRefreshToken;