import React from 'react';
import './index.css';
import useAuth from '../../hooks/useAuth';
import { BiLogOut } from 'react-icons/bi';
import { GiHouseKeys } from 'react-icons/gi';
import { TbHomeDollar } from 'react-icons/tb';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { HiPlusSm } from 'react-icons/hi';
import { MdGroups } from 'react-icons/md';
import { IoIosSettings } from "react-icons/io";
import { RiHomeGearFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const UserProfile = ({ logout }) => {
    const { name, isAdmin, userId } = useAuth();
    const [isRentSell, setIsRentSell] = React.useState(false);
    const [isEditImg, setIsEditImg] = React.useState(false);

    const openRentSell = () => {
        if (isRentSell) {
            return setIsRentSell(false);
        }
        return setIsRentSell(true);
    }

    const openEditImg = () => {
        if (isEditImg) {
            return setIsEditImg(false);
        }
        return setIsEditImg(true);
    }

    return (
        <div className='user-profile-con'>
            <ul className='flex-col'>
                <li 
                    style={{textDecoration: 'underline', width: '100%', textAlign: 'center'}}
                    onClick={openEditImg}
                >
                    {name}
                </li>
                {isEditImg && (
                    <li className='edit-user-img-btn'>
                        <Link to={`/usersImg/${userId}`} className='nav-links'>
                            Edit profile image
                        </Link>
                    </li>
                )}
                <li className='flex' onClick={openRentSell} style={{cursor: 'pointer'}}>
                    <Link to='/userprofile' className='nav-links'>
                        <RiHomeGearFill /> My Properties
                    </Link>
                </li>
                <li className='flex' onClick={openRentSell} style={{cursor: 'pointer'}}>
                    <HiPlusSm /> Add Property {isRentSell ? <FaAngleUp /> : <FaAngleDown />}
                </li>
                {isRentSell && (
                    <li className='flex-col prof-tab-rent-sell'>
                        <Link to='/createRent' className='nav-links'>
                            <GiHouseKeys /> For Rent
                        </Link>
                        <Link to='/createBuy' className='nav-links'>
                            <TbHomeDollar /> For Sale
                        </Link>
                    </li>
                )}
                {isAdmin && (
                    <li className='flex'>
                        <MdGroups />
                        <Link to='/admin' className='nav-links'>Dashboard</Link>
                    </li>
                )}
                {name && (
                    <li>
                        <Link to={`/users/${userId}`} className='nav-links flex'>
                            <IoIosSettings className='users-icon' /> Settings
                        </Link>
                    </li>
                )}
                {name && (
                    <li className='user-prof-logout'>
                        <p onClick={logout} className='flex-cen'>
                            <BiLogOut />
                            <span>Logout</span> 
                        </p> 
                    </li>
                )}
            </ul>
        </div>
    );
}

export default UserProfile;