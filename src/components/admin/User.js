import React from 'react';
import useDataContext from '../../hooks/useDataContext';

const User = ({user, openMsg, setUser}) => {
    const {setFetchMsgs} = useDataContext();
    const msgs = [];
    const userMsgs = user.messages.map(msg => {
        return msg
    });

    userMsgs.map(msg => {
        return msgs.push(msg.message);
    });

    // const msg = msgs.map((msg, i) => {
    //     return msg[1] 
    // })
    // console.log(msgs[1]);

    return (
        <div 
            key={user._id} 
            className='flex users-li' 
            onClick={() => {
                openMsg();
                setUser(user);
                setFetchMsgs(true);
            }}
        >
            <img src={user.image} alt="userImg" />
            <div className="user-msgs flex-col">
                <h5>{user.name}</h5>
                <p>
                    {msgs[msgs.length - 1].substring(0, 30)}...
                </p>
            </div>
        </div>
    );
}

export default User;