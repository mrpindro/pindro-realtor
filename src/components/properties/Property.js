import React from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaEye, FaLocationDot, FaRegHeart } from 'react-icons/fa6';
import { GiBanknote } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Property = ({ prop }) => {
  return (
    <Link to={`/properties/${prop._id}`} className='nav-links property-con flex-col'>
      <div className="property-img-con">
        <img src={prop.images[0]} alt="propImg" />
      </div>
      <div className="property-others flex-col">
        <div className="property-price-con flex">
          <p className='flex-cen'>
            <GiBanknote className='property-prop-icon' /> 
            {prop.price > 999 && prop.price < 10000 ? 
              `${prop.price.toString().substring(0, 1)}K` :
              prop.price
              && 
              prop.price > 9999 && prop.price < 100000 ? 
              `${prop.price.toString().substring(0, 2)}K` : 
              prop.price
              &&
              prop.price > 99999 && prop.price < 1000000 ? 
              `${prop.price.toString().substring(0, 3)}K` : 
              prop.price
              &&
              prop.price > 999999 && prop.price < 10000000 ?
              `${prop.price.toString().substring(0, 1)}M` :
              prop.price
              &&
              prop.price > 9999999 && prop.price < 100000000 ? 
              `${prop.price.toString().substring(0, 2)}M` :
              prop.price 
              &&
              prop.price > 99999999 && prop.price < 1000000000 ?
              `${prop.price.toString().substring(0, 3)}M` :
              prop.price
            }
          </p> 
          <span>{prop.options}</span>
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