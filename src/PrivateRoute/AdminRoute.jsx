import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContex/AuthContext';
import UseUserRole from '../hook/UseUserRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({ children }) => {

    const location = useLocation()
    const { user, loading } = use(AuthContext);
    const { role, isLoading } = UseUserRole()

    if (isLoading || loading) {
        return <span className="loading loading-ring loading-xl"></span>
    }
    if (!user || role !== 'admin') {
        return <Navigate state={location.pathname} to='/forbidden'></Navigate>
    }

    return children;
};

export default AdminRoute;