import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaAngleLeft, FaAngleRight, FaBed, FaShower } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { IoLink } from "react-icons/io5";
import { GiBanknote } from 'react-icons/gi';
import { BsFillImageFill, BsFillTelephoneFill } from 'react-icons/bs';
import axiosApi, { getRentsProps } from '../../../api/axiosApi';
import { Loader } from '@googlemaps/js-api-loader';
import GMap from '../../GMap';
import { useDeleteRentMutation } from '../../../features/rentsApiSlice';
import useAuth from '../../../hooks/useAuth';
import { statesCoordsData } from '../../../utils/data';
import FormatPrice from '../../FormatPrice';
import getLatLng from '../../../actions/getLatLng';
import moment from 'moment';
import useTitle from '../../../hooks/useTitle';

const RentProp = () => {
    const { name, isAdmin } = useAuth();
    const [ deleteRent, { isSuccess } ] = useDeleteRentMutation();
    const coordinates = statesCoordsData;

    const navigate = useNavigate();
    const { id } = useParams();

    
    const [prop, setProp] = React.useState(null);
    useTitle(`Rent - ${prop?.title}`);
    const [bigImg, setBigImg] = React.useState(null);
    const [val, setVal] = React.useState(0);
    const [isDel, setIsDel] = React.useState(false);
    const [loadMap, setLoadMap] = React.useState(false);
    const [longitude, setLongitude] = React.useState(coordinates.edo.longitude);
    const [latitude, setLatitude] = React.useState(coordinates.edo.latitude);

    React.useEffect(() => {
        const getProp = async () => {
            try {
                const response = await axiosApi.get(`${getRentsProps}/${id}`);

                setProp(response.data);
                setBigImg(response.data.images[0]);
            } catch (error) {
                console.log(error);
            }
        }

        getProp();
    }, [id]);

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
        getLatLng(setLatitude, setLongitude, prop?.location?.state);

        // eslint-disable-next-line 
    }, [prop, latitude, longitude]);

    React.useEffect(() => {

        if (isSuccess) {
            navigate('/rentProps');
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
        <main className='main-con rent-prop-main flex-col'>
            <div className='nav-back'>
                <Link to={-1} className='nav-links'>← Rents</Link>
            </div>
            <div className="property-prop-con flex-col">
                <div className="prop-images flex-col">
                    <div className="prop-big-img">
                        <img src={bigImg} alt="propImg" />
                        <div className="left-img-icon flex-cen" onClick={viewPrevImg}>
                            <FaAngleLeft className='property-prop-icon' />
                        </div>
                        <div className="right-img-icon flex-cen" onClick={viewNextImg}>
                            <FaAngleRight className='property-prop-icon' />
                        </div>
                    </div>
                    <div className="prop-other-imgs flex-cen">
                        {prop.images.map((image, i) => (
                            <img 
                                src={image} alt='proImg' key={i}
                                onClick={viewImg}
                            />
                        ))}
                    </div>
                </div>
                {name === prop.proprietor.name && (
                    <div className="edit-prop-img-btn flex-cen">
                        <Link to={`/editRentImg/${prop._id}`} className='nav-links flex'>
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
                            <FormatPrice price={prop.fee} />
                            <span>{prop.period}</span>
                        </div>
                    </div>
                    <div className="prop-desc-bath-rooms flex">
                        <div className="prop-desc flex-col">
                            <div className="created-at flex">
                                Listed:
                                <p>
                                    {moment(prop.createdAt).calendar()}
                                </p>
                            </div>
                            Description:
                            <span>{prop.description}</span>
                        </div>
                        <div className="prop-bath-rooms flex-col">
                            <div className="prop-rooms flex">
                                <IoLink className='property-prop-icon' />
                                Ref: 
                                <span>{prop._id.substring(0, 8)}</span>
                            </div>
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
                    <div className="property-owner flex-cen">
                        <div className="property-owner-left flex-col">
                            <div className="owner-img">
                                <img src={prop.proprietor.image} alt="propOwner" />
                            </div>
                            <div className="property-owner-name">
                                <p>{prop.proprietor.name}</p>
                            </div>
                            <div className="property-owner-tel flex">
                                <BsFillTelephoneFill />
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
                            <div className="property-address flex">
                                <p>{prop.location.street}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="delete-edit-btns flex-cen">
                    {name === prop.proprietor.name && (
                        <Link to={`/editRent/${prop._id}`} className='nav-links'>
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

export default React.memo(RentProp);