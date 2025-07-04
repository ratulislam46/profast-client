import React from 'react';
import UseUserRole from '../../../hook/UseUserRole';
import Loading from '../../../Components/Loading';
import UserDashboard from './UserDashboard';
import RiderDashboard from './RiderDashboard';
import AdminDashboard from './AdminDashboard';
import Forbidden from '../../Forbidden/Forbidden';

const DashboardHome = () => {

    const { role, isLoading } = UseUserRole();

    if (isLoading) {
        return <Loading></Loading>
    }

    if (role === 'user') {
        return <UserDashboard></UserDashboard>
    }
    else if (role === 'rider') {
        return <RiderDashboard></RiderDashboard>
    }
    else if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;