import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './index.css';
import Property from './Property';
import { Link } from 'react-router-dom';
import axiosApi from '../../api/axiosApi';

const Properties = () => {
    const [props, setProps] = React.useState(null);

    React.useEffect(() => {
        const getAllProps = async () => {
            try {             
                const res = await axiosApi.get('/props');
                setProps(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllProps();
    }, []);

    return (
        <main className='props-main main-con'>
            <div className='nav-back flex-cen'>
                <Link to={- 1} className='nav-links'>← Back </Link> 
                <div className="allprops-buy-rent flex-cen">
                    <Link to='/buyprops' className='nav-links'> Purchase </Link>
                    <Link to='/rentprops' className='nav-links'> Rent </Link>
                </div>
            </div>
            <div className="props-con">
                {props?.length ? props?.map(prop => (
                    <Property prop={prop} key={prop._id} />
                )) : (
                    <ClipLoader />
                )}
            </div>
            {/* <div className="props-con">
                {props?.length ? props.map(prop => (
                    <Property prop={prop} key={prop.id} />
                )) : (
                    <ClipLoader color='#fff' />
                )}
            </div> */}
        </main>
    );
}

export default Properties;