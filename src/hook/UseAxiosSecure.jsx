import axios from 'axios';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContex/AuthContext';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
});

const UseAxiosSecure = () => {

    const { user, logOut } = use(AuthContext);
    const navigate = useNavigate();

    // jwt token related 
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error)
    })

    // admin related verify 
    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            toast.error('user token is disable')
            navigate('/')
        }
        if (status === 401) {
            logOut(() => {
                navigate('/logout')
            })
                .catch(() => {
                    console.log('error interceptors');
                })
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default UseAxiosSecure;