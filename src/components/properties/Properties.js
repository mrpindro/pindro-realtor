import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './index.css';
import Property from './Property';
import { Link } from 'react-router-dom';
// import axiosApi from '../../api/axiosApi';
import useRents from '../../hooks/useRents';
import useBuys from '../../hooks/useBuys';

const Properties = () => {
    const [rents] = useRents();
    const [buys] = useBuys();
    const props = [];

    rents?.map(prop => {
        return props.push(prop);
    });

    buys?.map(prop => {
        return props.push(prop);
    });

    props.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        if (titleA < titleB) {
            return -1;
        }

        if (titleA > titleB) {
            return 1;
        }

        return 0;
    });

    // React.useEffect(() => {
    //     console.log(props);

    //     // eslint-disable-next-line 
    // }, [props]);

    // React.useEffect(() => {
    //     console.log(buys);
    // }, [buys]);

    // React.useEffect(() => {
    //     const getAllProps = async () => {
    //         try {             
    //             const res = await axiosApi.get('/props');
    //             setProps(res.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     getAllProps();
    // }, []);

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
                    <ClipLoader color='#fff' />
                )}
            </div>
        </main>
    );
}

export default Properties;