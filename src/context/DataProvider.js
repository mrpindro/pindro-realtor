import { createContext, useEffect, useRef, useState } from "react";
import { statesCoordsData } from '../utils/data';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const coordinates = statesCoordsData;

    const [longitude, setLongitude] = useState(coordinates.edo.longitude);
    const [latitude, setLatitude] = useState(coordinates.edo.latitude);
    const [successMsgs, setSuccessMsgs] = useState('');
    const [errMsgs, setErrMsgs] = useState('');
    const [isErr, setIsErr] = useState(false);
    const [fetchMsgs, setFetchMsgs] = useState(false);
    const [fetchUser, setFetchUser] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

    const msgsRef = useRef();

    const handleShowPwd = () => {
        if (showPwd) {
            return setShowPwd(false)
        }
        setShowPwd(true);
    }

    const toggleLogin = () => {
        if (isLogin) {
            return setIsLogin(false);
        }
        setIsRegister(false);
        setIsLogin(true);
    }

    const toggleRegister = () => {
        if (isRegister) {
            return setIsRegister(false);
        }
        setIsLogin(false);
        setIsRegister(true);
    }

    useEffect(() => {
        if(errMsgs || successMsgs) {
            setTimeout(() => {
                setErrMsgs('');
                setSuccessMsgs('');
            }, 5000);
        }
    }, [errMsgs, successMsgs]);

    return (
        <DataContext.Provider
            value={{ 
                fetchMsgs, setFetchMsgs, isLogin, setIsLogin, toggleLogin, 
                isRegister, setIsRegister, toggleRegister, msgsRef,
                showPwd, setShowPwd, handleShowPwd,
                fetchUser, setFetchUser,
                latitude, longitude, setLatitude, setLongitude, errMsgs,
                successMsgs, setSuccessMsgs, isErr, setIsErr, setErrMsgs
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;