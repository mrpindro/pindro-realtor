import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { FcAssistant } from 'react-icons/fc';
import './index.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { IoMdCloseCircle } from "react-icons/io";
import useAuth from '../../hooks/useAuth';
import { useSendMessagesMutation } from '../../features/usersApiSlice';
import useUser from '../../hooks/useUser';
import useDataContext from '../../hooks/useDataContext';

const Messenger = ({ onOpen }) => {
    const [sendMessages, {isLoading, isError, error}] = useSendMessagesMutation();
    const {setFetchMsgs, msgsRef} = useDataContext();
    
    const { name, userId } = useAuth();

    const [user] = useUser();
    // console.log(user);

    const [message, setMessage] = React.useState('');
    const [msgSent, setMsgSent] = React.useState(false);

    const msgRef = React.useCallback(node => {
        if(node) {
            node.scrollIntoView({ smooth: true });
        }
    }, [])

    React.useEffect(() => {
        if (isError) {
            console.log(error)
        }

        // eslint-disable-next-line 
    }, [isError]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        setFetchMsgs(true);
        setMsgSent(true);

        setTimeout(() => {
            setFetchMsgs();
        }, 500);
        
        try {
            await sendMessages({
                id: userId, message, sender: name.split(' ')[0]
            });
            
            setMessage('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='messenger-con flex-col'>
            <h4 className='flex-cen'><FcAssistant size={30} /> Messenger</h4>
            <div 
                className="close-messenger flex-cen" onClick={onOpen} 
                title='Close messenger'
            >
                <IoMdCloseCircle className='msg-close-icon' />
            </div>
            <div className="messenger-msgs flex-col">
                <div className="msgs-con flex-col">
                    {user?.messages?.length ? user?.messages?.map((msg, i) => (
                        <div 
                            className={`flex-col
                                ${msg.sender === 'admin' ? 'admin-msg' : 'msgs'}
                            `}
                            key={i} 
                            ref={msgRef}
                        >
                            <p>{msg.message}</p>
                            <em>{msg.sender}</em>
                        </div>
                    )): (
                        <div className="msgs">
                            {!msgSent && <p>Hello {name}</p>}
                        </div>
                    )}
                </div>
            </div>
            <form className="messenger-form flex-cen" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        id='assist-msg'
                        type="text" 
                        placeholder='Hello, how can i assist you?'
                        value={message}
                        ref={msgsRef}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button type='submit' onClick={() => setFetchMsgs(true)}>
                    {isLoading ? <ClipLoader size={15} /> : 
                        (<FaPaperPlane className='messenger-icon' />)
                    }
                </button>
            </form>
        </div>
    );
}

export default Messenger;