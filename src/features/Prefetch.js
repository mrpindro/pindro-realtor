import { store } from '../store/store';
import { usersApiSlice } from './usersApiSlice';
import { Outlet } from 'react-router-dom';
import React from 'react';

const Prefetch = () => {
    React.useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }));
    }, []);

    return <Outlet />
}

export default Prefetch;