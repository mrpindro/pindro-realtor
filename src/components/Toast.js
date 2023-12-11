import React from 'react';
import { IoInformationCircleSharp } from "react-icons/io5";
import useDataContext from '../hooks/useDataContext';

const Toast = () => {
    const {errMsgs, successMsgs, isErr} = useDataContext();

    // React.useEffect(() => {
    //     setSuccessMsgs('Success');
    // }, [successMsgs]);

    return (
        <div 
            className={
                successMsgs.length && !isErr ? 'flex-cen toast-con' : 
                errMsgs.length && isErr ? 'flex-cen toast-err' :
                !successMsgs.length && !errMsgs.length ? 'toast-off' : 
                ''
            }
        >
            <IoInformationCircleSharp />
            <div className="toast">
                {errMsgs || successMsgs}
            </div>
        </div>
    );
}

export default Toast;