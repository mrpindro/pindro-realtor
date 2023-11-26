import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div className='main-con'>
            <Link to={-1} className='nav-links nav-back'>← Back</Link>
        </div>
    );
}

export default Admin;