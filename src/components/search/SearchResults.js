import React from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { GiBanknote } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import FormatPrice from '../FormatPrice';

const SearchResults = ({props}) => {
    return (
        <>
            {props.map(prop => (
                <Link 
                    to={`/rentprops/${prop._id}`} 
                    className='nav-links property-con flex-col'
                    key={prop._id}
                >
                    <div className="property-img-con">
                        <img src={prop.images[0]} alt="propImg" />
                    </div>
                    <div className="property-others flex-col">
                        <div className="property-price-con flex">
                            <p className='flex-cen'>
                                <GiBanknote /> 
                                <FormatPrice price={prop.fee} />
                            </p> 
                            <span>{prop.period}</span>
                        </div>
                        <div className="property-title-con">
                            {prop.title.substring(0, 65)}.
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
            ))}
        </>
    );
}

export default SearchResults;