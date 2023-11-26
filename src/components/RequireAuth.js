import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
    const { email } = useAuth();
    const location = useLocation();

    return (
        <div className='require-auth'>
            {email ? <Outlet /> : (
                <Navigate to='/auth' state={{ from: location }} replace />
            )}
        </div>
    );
}

export default RequireAuth;