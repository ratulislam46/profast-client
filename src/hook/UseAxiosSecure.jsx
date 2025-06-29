import axios from 'axios';
import { use, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContex/AuthContext';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
});

const UseAxiosSecure = () => {

    const { user } = use(AuthContext)

    useEffect(() => {
        if (user?.email) {
            axiosSecure.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${user.accessToken}`
                return config;
            }, error => {
                return Promise.reject(error)
            })
        }
    }, [user])



    return axiosSecure;
};

export default UseAxiosSecure;