import React from 'react';
import { FaPaperPlane } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useSendMessagesMutation } from '../../features/usersApiSlice';
import getUser from '../../actions/getUser';
import { ClipLoader } from 'react-spinners';

const Messages = ({ user, openMsg }) => {

    const [sendMessages, {isLoading}] = useSendMessagesMutation();
    const [message, setMessage] = React.useState('');
    const [theUser, setTheUser] = React.useState(null);

    const msgRef = React.useCallback(node => {
        if(node) {
            node.scrollIntoView({ smooth: true });
        }
    }, [])


    const timeout = (use, time) => {
        setTimeout(() => {
            return use;
        }, time);
    }

    React.useEffect(() => {

        const gettingUser = async () => {
            const foundUser = await getUser(user._id);
            setTheUser(foundUser);
        }
        timeout(gettingUser(), 1000);
        
        // eslint-disable-next-line 
    });

    // console.log(user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await sendMessages({
                id: user._id, message, sender: 'admin'
            });

            setMessage('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="users-msgs flex-col">
            <h4>Messages</h4>
            <div 
                className="close-admin-messenger"
                title='Close messenger'
                onClick={openMsg}
            >
                <FaChevronLeft /> 
            </div>
            <div className="user-name-img flex-cen">
                {theUser?.image && (
                    <img src={user?.image} alt="userImg" />
                )}
                <p>{theUser?.name}</p>
            </div>
            <div className="user-msgs-list-form flex-col">
                <div className="users-msgs-list flex-col">
                    <div className="user-msgs flex-col">
                        {theUser?.messages.map((msg, i) => (
                            <div 
                                className={`flex-col
                                    ${msg.sender === 'admin' ? 'admin-msg' : 'user-msg'}
                                `} 
                                key={i}
                                ref={msgRef}
                            >
                                <p>{msg.message}</p>
                                <em>{msg.sender}</em>
                            </div>
                        ))}
                    </div>
                </div>
                <form className="msgs-response-form flex-cen" onSubmit={handleSubmit}>
                    <textarea 
                        name="response" 
                        id="user-msg-response" 
                        placeholder='Write response...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button type='submit'>
                        {isLoading ? <ClipLoader size={15} /> : 
                            (<FaPaperPlane  />)
                        } 
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Messages;