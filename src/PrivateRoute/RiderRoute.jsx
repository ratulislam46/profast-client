import React, { use } from 'react';
import { useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContex/AuthContext';
import UseUserRole from '../hook/UseUserRole';

const RiderRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = use(AuthContext);
    const { role, isLoading } = UseUserRole()

    if (isLoading || loading) {
        return <span className="loading loading-ring loading-xl"></span>
    }
    if (!user || role !== 'rider') {
        return <Navigate state={location.pathname} to='/forbidden'></Navigate>
    }

    return children;
};

export default RiderRoute;