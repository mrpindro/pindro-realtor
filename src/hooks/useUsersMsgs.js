import { useEffect, useState } from "react";
import getUsers from '../actions/getUsers';

const useUsersMsgs = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserss = async () => {
      const users = await getUsers();
      setUsers(users);
    }

    setTimeout(() => {
      getUserss();
    }, 1000);

    // eslint-disable-next-line 
  });

  return [users];
}

export default useUsersMsgs;