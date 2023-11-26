import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './index.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { IoMdCloseCircle } from "react-icons/io";
import useAuth from '../../hooks/useAuth';

const Messenger = ({ onOpen }) => {
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const { name } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessages([...messages, message]);

        setMessage('');
    }

    return (
        <div className='messenger-con flex-col'>
            <div className="close-messenger flex-cen" onClick={onOpen}>
                <IoMdCloseCircle className='msg-close-icon' />
            </div>
            <div className="messenger-msgs flex-col">
                {messages ? messages.map((msg, i) => (
                    <div className="msgs flex-col" key={i}>
                        <p>{msg}</p>
                        <em>{name.split(' ')[0]}</em>
                    </div>
                )) : <ClipLoader />}
            </div>
            <form className="messenger-form flex-cen" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        id='assist-msg'
                        type="text" 
                        placeholder='Hello, how can i assist you?'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button type='submit'>
                    <FaPaperPlane className='messenger-icon' />
                </button>
            </form>
        </div>
    );
}

export default Messenger;