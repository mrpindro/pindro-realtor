import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaAngleLeft, FaAngleRight, FaBed, FaShower } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { GiBanknote } from 'react-icons/gi';
import { BsFillImageFill, BsFillTelephoneFill } from 'react-icons/bs';
import axiosApi, { getSellingProps } from '../../../api/axiosApi';
import { Loader } from '@googlemaps/js-api-loader';
import GMap from '../../GMap';
import { useDeleteBuyMutation } from '../../../features/buysApiSlice';
import useAuth from '../../../hooks/useAuth';
import { statesCoordsData } from '../../../utils/data';

const BuyProp = () => {
    const { name, isAdmin } = useAuth();
    const [ deleteRent, { isSuccess } ] = useDeleteBuyMutation();
    const coordinates = statesCoordsData;

    const navigate = useNavigate();

    const { id } = useParams();
    const [prop, setProp] = React.useState(null);
    const [bigImg, setBigImg] = React.useState(null);
    const [val, setVal] = React.useState(0);
    const [isDel, setIsDel] = React.useState(false);
    const [loadMap, setLoadMap] = React.useState(false);
    const [longitude, setLongitude] = React.useState(coordinates.edo.longitude);
    const [latitude, setLatitude] = React.useState(coordinates.edo.latitude);

    React.useEffect(() => {
        const getProp = async () => {
            try {
                const response = await axiosApi.get(`${getSellingProps}/${id}`);

                setProp(response.data);
                setBigImg(response.data.images[val]);
            } catch (error) {
                console.log(error);
            }
        }

        getProp();
    }, [id, val]);

    React.useEffect(() => {
        const options = {
            apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
            version: "weekly",
            libraries: ['geometry']
        };

        new Loader(options).load().then(() => {
            setLoadMap(true);
        }).catch(err => console.error(err))

    },[]);

    React.useEffect(() => {
        switch (prop?.location?.state) {
            case 'Lagos State': 
                setLatitude(coordinates.lagos.latitude);
                setLongitude(coordinates.lagos.longitude);
                break;
            case 'Cross River State':
                setLatitude(coordinates.crossRiver.latitude);
                setLongitude(coordinates.crossRiver.longitude);
                break;
            case 'Delta State':
                setLatitude(coordinates.delta.latitude);
                setLongitude(coordinates.delta.longitude);
                break;
            case 'Akwa Ibom State':
                setLatitude(coordinates.akwaIbom.latitude);
                setLongitude(coordinates.akwaIbom.longitude);
                break;
            case 'Abuja, FCT':
                setLatitude(coordinates.abuja.latitude);
                setLongitude(coordinates.abuja.longitude);
                break;
            case 'Plateau State':
                setLatitude(coordinates.plateau.latitude);
                setLongitude(coordinates.plateau.longitude);
                break;
            case 'Rivers State':
                setLatitude(coordinates.rivers.latitude);
                setLongitude(coordinates.rivers.longitude);
                break;
            case 'Ogun State':
                setLatitude(coordinates.ogun.latitude);
                setLongitude(coordinates.ogun.longitude);
                break;
            case 'Osun State':
                setLatitude(coordinates.osun.latitude);
                setLongitude(coordinates.osun.longitude);
                break;
            case 'Oyo State':
                setLatitude(coordinates.oyo.latitude);
                setLongitude(coordinates.oyo.longitude);
                break;
            default:
                setLatitude(coordinates.edo.latitude);
                setLongitude(coordinates.edo.longitude);
        }        
        // eslint-disable-next-line 
    }, [prop, latitude, longitude]);
    

    React.useEffect(() => {

        if (isSuccess) {
            navigate('/buyProps');
            alert('Property Removed!');
        }

        // eslint-disable-next-line 
    }, [isSuccess]);

    const viewImg = (e) => {
        setBigImg(e.currentTarget.src);
    }

    const viewPrevImg = () => {
        let index = val <= prop.images.length - 1 && val > 0 ? val - 1 : 
            val + prop.images.length - 1
        ;
        setVal(index);
        const img = prop.images[index]
        setBigImg(img);
    }

    const viewNextImg = () => {
        let index = val < prop.images.length - 1 ? val + 1 : 0;
        setVal(index);
        const img = prop.images[index]
        setBigImg(img);
    }

    if (!prop) {
        return <ClipLoader />;
    } 

    const openDelete = () => {
        if (isDel) {
            return setIsDel(false);
        }
        setIsDel(true);
    }

    const onDeleteProp = async () => {
        await deleteRent(prop._id);
    }

    return (
        <main className='main-con buy-prop-main flex-col'>
            <div className='nav-back'>
                <Link to={-1} className='nav-links'>← Buy </Link>
            </div>
            <div className="property-prop-con flex-col">
                <div className="prop-images flex-col">
                    <div className="prop-big-img">
                        <img src={bigImg} alt="propImg" />
                        <div className="left-img-icon" onClick={viewPrevImg}>
                            <FaAngleLeft className='property-prop-icon flex-cen' />
                        </div>
                        <div className="right-img-icon" onClick={viewNextImg}>
                            <FaAngleRight className='property-prop-icon flex-cen' />
                        </div>
                    </div>
                    <div className="prop-other-imgs flex-cen">
                        {prop.images.map((img, index) => (
                            <img 
                                src={img} alt='proImg' key={index}
                                onClick={viewImg}
                            />
                        ))}
                    </div>
                </div>
                {name === prop.proprietor.name && (
                    <div className="edit-prop-img-btn flex-cen">
                        <Link to={`/editBuyImg/${prop._id}`} className='nav-links flex'>
                            <BsFillImageFill className='property-prop-icon' />
                            <span>Update Images</span>
                        </Link>
                    </div>
                )}
                <div className="prop-all-others flex-col">
                    <div className="prop-title-price flex">
                        <div className="prop-title flex">
                            <AiFillHome className='property-prop-icon' />
                            {prop.title} 
                        </div>
                        <div className="prop-price flex">
                            <GiBanknote className='property-prop-icon' />
                            {
                                prop.price > 999 && prop.price < 10000 ? 
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
                            <span>{prop.option}</span>
                        </div>
                    </div>
                    <div className="prop-desc-bath-rooms flex">
                        <div className="prop-desc flex-col">
                            Description:
                            <span>{prop.description}</span>
                        </div>
                        <div className="prop-bath-rooms flex-col">
                            <div className="prop-rooms flex">
                                <FaBed className='property-prop-icon' />
                                Bedrooms: 
                                <span>{prop.rooms}</span>
                            </div>
                            <div className="prop-rooms flex">
                                <FaShower className='property-prop-icon' />
                                Bathrooms:
                                <span>{prop.bathrooms}</span>
                            </div>
                        </div>
                    </div>
                    <div className="property-owner flex">
                        <div className="property-owner-left flex-col">
                            <div className="owner-img">
                                <img src={prop.proprietor.image} alt="propOwner" />
                            </div>
                            <div className="property-owner-name">
                                <p>{prop.proprietor.name}</p>
                            </div>
                            <div className="property-owner-tel flex">
                                <BsFillTelephoneFill className='property-prop-icon' />
                                <a href={`tel:${prop.proprietor.tel}`}>{prop.proprietor.tel}</a>
                            </div>
                        </div>
                        <div className="address-prop-map flex-col">
                            <div className="property-address flex">
                                <p>{prop.location.town},</p>
                                <p>{prop.location.state}</p>
                            </div>
                            <div className="property-map">
                                {!loadMap ? <p>Loading...</p> : (
                                    <GMap latitude={latitude} longitude={longitude} />
                                )}  
                            </div>
                            <div className="property-address">
                                {prop.location.street}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="delete-edit-btns flex-cen">
                    {name === prop.proprietor.name && (
                        <Link to={`/editBuy/${prop._id}`} className='nav-links'>
                            Modify
                        </Link>
                    )}
                    {(name === prop.proprietor.name || isAdmin)  && (
                        <div className="prop-del-options">
                        {!isDel && (
                            <button className='delete-btn' onClick={openDelete}>
                                Delete
                            </button>
                        )}
                        {isDel && (
                            <div className="del-options flex-col">
                                <p>Are you sure?</p>
                                <div className="delete-prop flex">
                                    <button onClick={openDelete}>No, cancel</button>
                                    <button 
                                        className='delete-btn' onClick={onDeleteProp}
                                    >
                                        Yes, delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default BuyProp;