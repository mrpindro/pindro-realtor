import React from 'react';
import './index.css';
import { TbHomeDollar } from 'react-icons/tb';
import { PiCurrencyNgnDuotone } from 'react-icons/pi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import useAuth from '../../hooks/useAuth';
import { FaBed, FaShower } from 'react-icons/fa';
import { useUpdateBuyMutation } from '../../features/buysApiSlice';
import axiosApi, { getSellingProps } from '../../api/axiosApi';

const EditBuy = () => {
    const { userId } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [updateBuy, {isLoading, isSuccess}] = useUpdateBuyMutation();

    const [prop, setProp] = React.useState(null);

    React.useEffect(() => {
        const getPost = async () => {
            const response = await axiosApi.get(`${getSellingProps}/${id}`);
            setProp(response?.data);
        }

        getPost();
    }, [id]);

    const [ownerId, setOwnerId] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [option, setOption] = React.useState('');
    const [rooms, setRooms] = React.useState(0);
    const [bathrooms, setBathrooms] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [state, setState] = React.useState('');
    const [town, setTown] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [errMsg, setErrMsg] = React.useState('');

    React.useEffect(() => {
        if (isSuccess) {
            clear()
            setErrMsg('');
            alert('Property Updated');
            navigate(`/buyprops/${id}`);
        }

        // eslint-disable-next-line 
    }, [isSuccess])

    React.useEffect(() => {
        if (prop) {
            setOwnerId(userId)
            setTitle(prop.title)
            setPrice(prop.price);
            setOption(prop.option);
            setRooms(prop.rooms);
            setBathrooms(prop.bathrooms);
            setDescription(prop.description);
            setState(prop.location.state);
            setTown(prop.location.town);
            setStreet(prop.location.street);
        }

        // eslint-disable-next-line 
    }, [prop]);

    const clear = () => {
        setTitle('');
        setPrice(0);
        setOption('')
        setRooms(0);
        setBathrooms(0);
        setDescription('');
        setState('');
        setTown('');
        setStreet('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (
                title || price || option || rooms || bathrooms || description ||
                state || town
            ) {
                await updateBuy({
                    id, ownerId, title, price, option, rooms, bathrooms,
                    description, state, town, street
                })
            } 
        } catch (error) {
            console.error(error);
            setErrMsg(error);
        }
    }

    return (
        <main className='main-con create-buy-main'>
            <Link to={-1} className='nav-links'>back</Link>
            <div className="props-form-con">
                <form 
                    className='props-form flex-col' onSubmit={handleSubmit}
                >
                    <div className="prop-con-icon flex-col">
                        <TbHomeDollar className='prop-icon' />
                    </div>
                    <h3>Updating Property For Sale</h3>
                    <div className="form-group flex-col">
                        <input 
                            type="text" 
                            placeholder='Property Title'
                            id='edit-buy-title'
                            name='title'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="edit-buy-title">
                            Title *
                        </label>
                    </div>
                    <div className="form-group flex-col">
                        <span className='prop-icon-span'>
                            <PiCurrencyNgnDuotone className='prop-span-icon' />
                        </span>
                        <input 
                            type="number" 
                            placeholder='Insert Price'
                            id='edit-buy-price' 
                            name='price'
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label htmlFor="edit-buy-price">
                            Sale Price *
                        </label>
                    </div>
                    <div className="form-group flex-col">
                        <input 
                            type="text"
                            id='edit-buy-option'
                            name='option'
                            required
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                        />
                        <label htmlFor="edit-buy-option">
                            Sale Options *
                        </label>
                    </div>
                    <div className="form-group flex-col">
                        <span className='prop-icon-span'>
                            <FaBed className='prop-span-icon' />
                        </span>
                        <input 
                            type='number' 
                            placeholder='Number of bedrooms'
                            id='edit-buy-rooms'
                            name='rooms'
                            required
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                        />
                        <label htmlFor="edit-buy-rooms">
                            Number of bedrooms *
                        </label>
                    </div>
                    <div className="form-group flex-col">
                        <span className='prop-icon-span'>
                            <FaShower className='prop-span-icon' />
                        </span>
                        <input 
                            type='number' 
                            placeholder='Number of bathrooms'
                            id='edit-buy-bathrooms'
                            name='bathrooms'
                            required
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                        />
                        <label htmlFor="edit-buy-bathrooms">
                            Number of bathrooms *
                        </label>
                    </div>
                    <div className="form-textarea flex-col">
                        <textarea 
                            name="description" 
                            id="edit-buy-description" 
                            placeholder='Write Description'
                            cols="30" 
                            rows="10"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <label htmlFor="edit-buy-description">
                            Home description: [min: 20 characters] *
                        </label>
                    </div>
                    <div className="form-location flex-col">
                        <p className='prop-location'>
                            Location 
                        </p>
                        <div className="form-group flex-col">
                            <input 
                                type="text"
                                id='edit-buy-state' 
                                name='state'
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                readOnly
                            />
                            <label htmlFor="edit-buy-state">State *</label>
                        </div>
                        <div className="form-group flex-col">
                            <input 
                                type="text"
                                id='edit-buy-town' 
                                name='town'
                                required
                                value={town}
                                onChange={(e) => setTown(e.target.value)}
                                readOnly
                            />
                            <label htmlFor="edit-buy-town">Town *</label>
                        </div>
                        <div className="form-group flex-col">
                            <input 
                                type="text" 
                                name='street'
                                id='edit-buy-street'
                                placeholder='Home Street Details'
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <label htmlFor="edit-buy-street">Street</label>
                        </div>
                    </div>
                    
                    <button 
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <ClipLoader /> : 'SUBMIT MODIFICATION'}
                    </button>
                    <p className='errMsg'>
                        {errMsg}
                    </p>
                </form>
            </div>
        </main>
    );
}

export default EditBuy;