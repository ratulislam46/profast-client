import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContex/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const location = useLocation()
    const { user, loading } = use(AuthContext);

    if (loading) {
        return <span className="loading loading-ring loading-xl"></span>
    }

    if (user && user?.email) {
        return children
    }


    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;