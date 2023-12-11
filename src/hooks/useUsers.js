import { useEffect, useState } from "react";
import getUsers from '../actions/getUsers';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserss = async () => {
      const users = await getUsers();
      setUsers(users);
      console.log(users)
    }

    getUserss();

    // eslint-disable-next-line 
  }, []);

  return [users];
}

export default useUsers;