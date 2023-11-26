import React, { useState } from 'react';
import { BsEnvelopeAtFill } from "react-icons/bs";
import { FaPhone } from "react-icons/fa";
import './index.css';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axiosApi from '../../api/axiosApi';

const UserPage = () => {
    const { name, email, image, phoneNum, userId } = useAuth();
    
    const [rentProps, setRentProps] = React.useState([]);
    const [salesProps, setSalesProps] = React.useState([]);

    const [isRent, setIsRent] = useState(true);

    React.useEffect(() => {
        const getProps = async () => {
            try {
                const res = await axiosApi.get('rent/props');

                setRentProps(res?.data);
            } catch (error) {
                console.log(error)
            }
        }
        getProps();
    }, []);

    React.useEffect(() => {
        const getProps = async () => {
            try {
                const res = await axiosApi.get('buy/props');

                setSalesProps(res?.data);
            } catch (error) {
                console.log(error)
            }
        }
        getProps();
    }, []);

    const myRents = rentProps?.filter(prop => {
        return prop.ownerId === userId
    });
    const mySales = salesProps.filter(prop => {
        return prop.ownerId === userId
    });

    return (
        <main className='main-con user-page-main flex-col'>
            <Link to={-1} className='nav-back nav-links'>← Back</Link>
            <div className="user-page-con">
                <div className="user-page-user-sec flex-col">
                    <div className="user-page-user-img">
                        <img src={image} alt="userImg" />
                    </div>
                    <div className="user-page-username">
                        {name}
                    </div>
                    <div className="user-page-user-info flex-cen">
                        <p className='flex'>
                            <span><BsEnvelopeAtFill /> </span> {email}
                        </p>
                        <p className='flex'>
                            <span><FaPhone /> </span> {phoneNum}
                        </p>
                    </div>
                </div>
                <hr />
                <div className="user-page-props-sec flex-col">
                    <div className="user-page-props-type flex-cen">
                        <button 
                            onClick={() => setIsRent(true)}
                            style={ isRent ? {backgroundColor: '#896d25'} : 
                                {backgroundColor: ''}
                            }
                        >
                            Rent
                        </button>
                        <button 
                            onClick={() => setIsRent(false)} 
                            style={ isRent ? {backgroundColor: ''} : 
                                {backgroundColor: '#896d25'}
                            }
                        >
                            Sale
                        </button>
                    </div>
                </div>
                <div className="user-page-props">
                    {isRent ? (
                        <div className="user-page-prop-imgs">
                            {myRents?.length ? myRents.map(prop => (
                                <Link 
                                    to={`/rentprops/${prop._id}`}
                                    className="user-props-con nav-links" key={prop._id}
                                >
                                    <img src={prop.images[0]} alt='propImg' />
                                    <p className='flex-col'>{prop.title}</p>
                                </Link>
                            )) : (
                                <p>You have no listed rent property</p>
                            )}
                        </div>
                    ) : (
                        <div className="user-page-prop-imgs">
                            {mySales?.length ? mySales.map(prop => (
                                <Link 
                                    to={`/buyprops/${prop._id}`}
                                    className="user-props-con nav-links" key={prop._id}
                                >
                                    <img src={prop.images[0]} alt='propImg' />
                                    <p className='flex-col'>{prop.title}</p>
                                </Link>
                            )) : (
                                <p>You have no listed property for sale</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default UserPage;