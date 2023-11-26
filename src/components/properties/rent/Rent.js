import React from 'react';
import { Link } from 'react-router-dom';
import { GiBanknote } from 'react-icons/gi';
import { FaLocationDot, FaRegHeart } from 'react-icons/fa6';
import { FaEye } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

const Rent = ({prop}) => {
    return (
        <Link to={`/rentprops/${prop._id}`} className='nav-links property-con flex-col'>
            <div className="property-img-con">
                <img src={prop.images[0]} alt="propImg" />
            </div>
            <div className="property-others flex-col">
                <div className="property-price-con flex">
                    <p className='flex-cen'>
                        <GiBanknote /> 
                        {
                            prop.fee > 999 && prop.fee < 10000 ? 
                            `${prop.fee.toString().substring(0, 1)}K` :
                            prop.fee
                            && 
                            prop.fee > 9999 && prop.fee < 100000 ? 
                            `${prop.fee.toString().substring(0, 2)}K` : 
                            prop.fee
                            &&
                            prop.fee > 99999 && prop.fee < 1000000 ? 
                            `${prop.fee.toString().substring(0, 3)}K` : 
                            prop.fee
                            &&
                            prop.fee > 999999 && prop.fee < 10000000 ?
                            `${prop.fee.toString().substring(0, 1)}M` :
                            prop.fee
                            &&
                            prop.fee > 9999999 && prop.fee < 100000000 ? 
                            `${prop.fee.toString().substring(0, 2)}M` :
                            prop.fee 
                            &&
                            prop.fee > 99999999 && prop.fee < 1000000000 ?
                            `${prop.fee.toString().substring(0, 3)}M` :
                            prop.fee
                        }
                    </p> 
                    <span>{prop.period}</span>
                </div>
                <div className="property-title-con">
                    {prop.title.substring(0, 80)}.
                </div>
                <div className="property-location-con flex">
                    <FaLocationDot className='property-prop-icon' />
                    <div className="property-state">
                        {prop.location.town},
                    </div>
                    <div className="property-state">
                        {prop.location.state}
                    </div>
                </div>
                <div className="property-like-view-call flex-cen">
                    <FaRegHeart className='property-prop-icon' />
                    <FaEye className='property-prop-icon' />
                    <BsFillTelephoneFill className='property-prop-icon' />
                </div>
            </div>
        </Link>
    );
}

export default Rent;