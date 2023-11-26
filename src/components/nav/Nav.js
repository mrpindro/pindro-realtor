import React from 'react';
import { Link } from 'react-router-dom';
import { GiHouseKeys } from 'react-icons/gi';
import { AiFillHome, AiOutlinePhone } from 'react-icons/ai';
import { BiLogIn, BiSolidGroup, BiSolidPurchaseTagAlt } from 'react-icons/bi';
import './index.css'

const Nav = ({onOpen}) => {
    return (
        <nav className='main-nav flex-col'>
            <ul className='flex-col'>
                <li>
                    <Link 
                        to='/' onClick={onOpen}
                        className='nav-links flex-cen flex'
                    >
                        <AiFillHome /> Home
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/about' onClick={onOpen}
                        className='nav-links flex-cen flex'
                    >
                        <BiSolidGroup /> About Us
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/rentprops' onClick={onOpen}
                        className='nav-links flex-cen flex'
                    >
                        <GiHouseKeys /> Rent a Property
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/buyprops' onClick={onOpen}
                        className='nav-links flex-cen flex'
                    >
                        <BiSolidPurchaseTagAlt /> Buy a Property
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/contact' onClick={onOpen}
                        className='nav-links flex-cen flex'
                    >
                        <AiOutlinePhone /> Contact Us
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/auth' onClick={onOpen}
                        className='nav-links flex-cen flex'
                    >
                        <BiLogIn /> Sell or Rent Out your Property
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;