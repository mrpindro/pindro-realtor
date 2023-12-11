import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import './index.css';
import Messages from './Messages';
import User from './User';
import useUsersMsgs from '../../hooks/useUsersMsgs';

const AdminDashboard = () => {
    const [users] = useUsersMsgs();

    const [isMsg, setIsMsg] = React.useState(false);
    const [user, setUser] = React.useState(null);

    function openMsg() {
        if (isMsg) {
            return setIsMsg(false);
        }

        setIsMsg(true);
    }

    const userWithMessagess = users.map(user => {
        return user;
    });
    
    const userWithMessages = userWithMessagess.filter(user => {
        return user.messages.length > 0;
    });

    // console.log(users);

    return (
        <main className='main-con admin-dashbrd-main flex-col'>
            <div className="admin-dashbrd-con flex-col">
                <ul className="admin-nav flex-cen">
                    <li>
                        <Link to='/users' className='nav-links flex'>
                            <HiUserGroup />
                            USERS
                        </Link>
                    </li>
                    <li>
                        <Link className='nav-links flex'>
                            <AiOutlineMessage />
                            MESSAGES
                        </Link>
                    </li>
                </ul>
                <Link to={-1} className='nav-links nav-back'>← Back</Link>
                <div className="admin-dashbrd-sec">
                    <div className="admin-msgs flex">
                        {!isMsg ?  (
                            <div className="msgs-users flex-col">
                                <h4>Users</h4>
                                <div className='flex-col users-li-con'>
                                    {userWithMessages?.length ? userWithMessages.map(user => (
                                        <User 
                                            user={user} key={user._id} 
                                            openMsg={openMsg} 
                                            setUser={setUser}
                                        />
                                    )) : <p>No User</p> }
                                </div>
                            </div>
                        ) : (
                            <Messages user={user} openMsg={openMsg} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminDashboard;