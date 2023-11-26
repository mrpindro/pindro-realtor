import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidLogInCircle } from 'react-icons/bi';
import './index.css';

const Home = () => {

    return (
        <main className='home-main flex-col'>
            <div className="home-con flex-col">
                <p>PINDRO REALTOR</p>
                <h1>Find Your Perfect Home.</h1>
                <Link to='properties' className='nav-links'>EXPLORE</Link>
            </div>
            <Link to='auth' className='nav-links home-auth flex-cen'>
                Sell or Rent Out Your Property
                <BiSolidLogInCircle className='home-auth-icon' />
            </Link>
        </main>
    );
}

export default Home;