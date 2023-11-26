import React from 'react';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

const Socials = () => {
    return (
        <div className='socials flex-cen'>
            <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'
                className='nav-links'
            >
                <AiFillInstagram className='socials-icon' />
            </a>
            <a href='https://www.twitter.com' target='_blank' rel='noreferrer'
                className='nav-links'
            >
                <AiFillTwitterCircle className='socials-icon' />
            </a>
            <a href="https://www.facebook.com" target='_blank' rel='noreferrer'
                className='nav-links'
            >
                <BsFacebook className='socials-icon' />
            </a>
        </div>
    );
}

export default Socials;