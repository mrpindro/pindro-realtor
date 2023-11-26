import React, { useState } from 'react';
import Nav from '../nav/Nav';
import './index.css';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import logo from '../../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Socials from '../Socials';
import useAuth from '../../hooks/useAuth';
import { useSendLogoutMutation } from '../../features/authApiSlice';
import UserProfile from '../users/UserProfile';

const Header = () => {
    const [sendLogOut, {isSuccess}] = useSendLogoutMutation();
    const { image } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isUserTab, setIsUserTab] = useState(false);
    const navigate = useNavigate();

    const onOpen = () => {
        if (isOpen) {
            return setIsOpen(false);
        } 

        setIsOpen(true)
    }

    const onOpenUserTab = () => {
        if (isUserTab) {
            return setIsUserTab(false);
        } 

        setIsUserTab(true);
    }

    const logout = async () => {
        sendLogOut()
        window.location.reload();
    }

    React.useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    return (
        <header>
            <div className="header-nav flex-col">
                <div className='header-icon-con' 
                    onClick={onOpen}
                >
                    <AiOutlineMenu className='header-icon' />
                </div>
                <div className="header-nav-con">
                    {isOpen &&           
                        <Nav onOpen={onOpen} />
                    }
                </div>
            </div>
            <div className="header-logo flex-cen">
                <img src={logo} alt="site logo" 
                    onClick={() => navigate('/')}
                    title='Home'
                />
            </div>
            <div className="header-search-soc flex-cen">
                <Link to='/search' className='nav-links search flex-cen'>
                    <AiOutlineSearch className='header-search-icon' />
                </Link>
                <Socials />
                {image && (
                    <div className="header-user flex-col">
                        <div className="user-img flex-cen" onClick={onOpenUserTab}>
                            {image && <img src={image} alt="userImg" /> }
                        </div>
                        <div className="header-user-tab">
                            {isUserTab && <UserProfile logout={logout} />}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;