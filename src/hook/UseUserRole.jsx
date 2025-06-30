import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContex/AuthContext';
import UseAxiosSecure from './UseAxiosSecure';

const UseUserRole = () => {
    const { user, loading } = use(AuthContext)
    const axiosSecure = UseAxiosSecure()

    const { data: role = 'user', isLoading, refetch } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`)
            return res.data.role;
        }
    });

    return { role, isLoading, refetch }
};

export default UseUserRole;
