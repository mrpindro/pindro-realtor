import React from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaEye, FaLocationDot, FaRegHeart } from 'react-icons/fa6';
import { GiBanknote } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import FormatPrice from '../FormatPrice';

const Property = ({ prop }) => {
  return (
    <Link 
      to={prop.fee ? `/rentprops/${prop._id}` : `/buyprops/${prop._id}`} 
      className='nav-links property-con flex-col'
    >
      <div className="property-img-con">
        <img src={prop.images[0]} alt="propImg" />
      </div>
      <div className="property-others flex-col">
        <div className="property-price-con flex">
          <div className='flex-cen'>
            <GiBanknote className='property-prop-icon' /> 
            <FormatPrice price={prop?.price || prop.fee} />
          </div> 
          <span>{prop.option || prop.period}</span>
        </div>
        <div className="property-title-con">
          {prop.title.substring(0, 80)}.
        </div>
        <div className="property-location-con flex-cen">
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

export default Property