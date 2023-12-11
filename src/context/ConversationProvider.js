import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useAuth from '../hooks/useAuth';
import useUsers from '../hooks/useUsers';

const ConversationContext = React.createContext();

export function useConversation() {
    return React.useContext(ConversationContext);
}

export const ConversationProvider = ({ sender, children}) => {
    const [users] = useUsers();
    const { name } = useAuth();
    const [msgs, setMsgs] = useLocalStorage('msgs', []);

    function createConversation(recipient) {
        setMsgs(prevConvos => {
            return [...prevConvos, { recipient, messages: [] }];
        })
    }

    function addMessageToConvo({ recipient, msg }) {
        setMsgs([...msgs, { recipient, messages: [msg], sender}]);
    }

    function sendMessage(recipient, msg) {
        addMessageToConvo({ recipient, msg, sender: name.split(' ')[0] })
    }

    const formattedConvo = msgs.map(msg => {
        const recipient = users.filter(user => {
            return user.roles.includes('admin');
        });
        const messages = msgs.map(msg => {
            // const contact = 'Admin';
            // const contact = users.find(user => {
            //     return user.name.split(' ')[0] === msg.sender
            // })
            const name = 'Admin';
            const fromMe = name === msg.sender

            return { ...msg, sendName: name, fromMe }
        })

        return {...msg, messages, recipient}
    })

    const value = {
        convos: formattedConvo,
        createConversation,
        sendMessage
    }

    return (
        <ConversationContext.Provider
            value={value}
        >
            {children}
        </ConversationContext.Provider>
    );
}
