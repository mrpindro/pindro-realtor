import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import usePersist from '../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/authSlice';
import { useRefreshMutation } from '../features/authApiSlice';
import Toast from './Toast';

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);

    const effectRan = React.useRef(false);
    const [trueSuccess, setTrueSuccess] = React.useState(false);

    const [refresh, 
        { isUnintialized, isLoading, isSuccess, isError, error, }
    ] = useRefreshMutation();

    useEffect(() => {
        // React 18 strict mode 
        if (effectRan?.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('Verifying refresh token');
                try {
                    await refresh();

                    setTrueSuccess(true);
                } catch (error) {
                    console.log(error);
                }
            }

            if (!token && persist) {
                verifyRefreshToken();
            }
        }
        
        return () => effectRan.current = true;
    // eslint-disable-next-line 
    }, []);

    let content;

    if (!persist) {
        // console.log('no persist');
        content = (
            <>
                <Toast />
                <Outlet />
            </>
        );
    } else if (isLoading) {
        // console.log('loading...');
        content = (
            <>
                <Toast />
                <Outlet />
            </>
        );
    } else if (isError) {
        if (error?.status === 401 ) {
            console.log('Not Logged In');
        } else {
            console.log(error);
        }
        // content = (
        //     <p className='errMsg'>
        //         {`${error.data?.message} - `}
        //         <Link to='/auth'>Please login again</Link>
        //     </p>
        // );
        content = (
            <>
                <Toast />
                <Outlet />
            </>
        );
    } else if (isSuccess && trueSuccess) {
        // console.log('success');
        content = (
            <>
                <Toast />
                <Outlet />
            </>
        );
    } else if (token && isUnintialized) {
        // console.log('token and uninit');
        // console.log(isUnintialized);
        content = (
            <>
                <Toast />
                <Outlet />
            </>
        );
    }

    return content;
}

export default PersistLogin;