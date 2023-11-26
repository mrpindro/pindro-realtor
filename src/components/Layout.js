import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FcAssistant } from 'react-icons/fc';
import Header from './header/Header';
import Messenger from './messenger/Messenger';
import useAuth from '../hooks/useAuth';

const Layout = () => {
    const date = new Date();
    const navigate = useNavigate();
    const { email } = useAuth();
    const [isOpen, setIsOpen] = React.useState(false);

    const onOpen = () => {
        if (isOpen) {
            return setIsOpen(false);
        }
        setIsOpen(true);
    }

    const openAsstChat = () => {
        if (email) {
            onOpen();
        } else {
            navigate('/auth');
        }
    }

    return (
        <div className='layout'>
            <Header />
            <div className="pages">
                <Outlet />
            </div>
            <div className="layout-messenger">
                { isOpen && <Messenger onOpen={onOpen} /> }
            </div>
            <div className="layout-asst" onClick={openAsstChat}>
                <FcAssistant className='layout-asst-icon' />
            </div>
            <footer className='layout-footer flex-col'>
                <h4>All Rights Reserved</h4>
                <p>Copyright © Austine Pindro | {date.getFullYear()}</p>
            </footer>
        </div>
    );
}

export default Layout;