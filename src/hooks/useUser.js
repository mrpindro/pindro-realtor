import { useEffect, useState } from "react"
import useAuth from "./useAuth";
import getUser from "../actions/getUser";
import useDataContext from "./useDataContext";

const useUser = () => {
    const { fetchMsgs, msgsRef } = useDataContext();
    const {userId} = useAuth();
    const [user, setUser] = useState(null);    
        
    useEffect(() => {
        const getUserById = async () => {
            const foundUser = await getUser(userId);
            setUser(foundUser);
        }
        
        if (msgsRef.current.focus) {
            setTimeout(() => {
                getUserById();
            }, 1000);
        }
        // eslint-disable-next-line 
    });

    useEffect(() => {
        const getUserById = async () => {
            const foundUser = await getUser(userId);
            setUser(foundUser);
        }
        
        getUserById();

        // eslint-disable-next-line 
    }, [fetchMsgs]);

    return [user]
}

export default useUser