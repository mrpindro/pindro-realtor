import React from 'react';
import './index.css';
import { BsFillImageFill } from 'react-icons/bs';
import { TbHomeDollar } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { statesData } from '../../utils/data';
import axiosApi, { postSellingProps, sendPropMail } from '../../api/axiosApi';
import ClipLoader from 'react-spinners/ClipLoader';
import useAuth from '../../hooks/useAuth';
import { PiCurrencyNgnDuotone } from 'react-icons/pi';
import { FaBed, FaShower } from 'react-icons/fa';
import useDataContext from '../../hooks/useDataContext';

const CreateBuy = () => {
    const { userId, name, email } = useAuth();
    const {setErrMsgs, setSuccessMsgs, setIsErr} = useDataContext();
    const navigate = useNavigate();

    const states = statesData;
    const imagesRef = React.useRef();

    const [title, setTitle] = React.useState('');
    const [images, setImages] = React.useState(null);
    const [price, setPrice] = React.useState(0);
    const [option, setOption] = React.useState('');
    const [rooms, setRooms] = React.useState(0);
    const [bathrooms, setBathrooms] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [state, setState] = React.useState('');
    const [town, setTown] = React.useState('');
    const [towns, setTowns] = React.useState([]);
    const [street, setStreet] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');
    const [successMsg, setSuccessMsg] = React.useState('');
    const [progress, setProgress] = React.useState({ started: false, pc: 0 });

    React.useEffect(() => {
        const selectedState = states.filter(iState => {
            return iState.name === state;
        });
        if (state === selectedState[0]?.name) {
            setTowns([...selectedState[0].towns]);
        }
    
        // eslint-disable-next-line 
    }, [state]);

    React.useEffect(() => {
        if (images?.length > 10) {
            return setErrMsg('Too many images selected: max 10');
        }
        if (town && !images?.length) {
            return setErrMsg('Images are required!')
        }
    
        // eslint-disable-next-line 
    }, [images, town]);

    const clear = () => {
        imagesRef.current.files = null;
        setTitle('');
        setPrice(0);
        setOption('');
        setRooms(0);
        setBathrooms(0);
        setDescription('');
        setState('');
        setTown('');
        setStreet('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setSuccessMsg('Uploading...')
        setProgress(prevState => {
            return {...prevState, started: true}
        })
        try {
            if (
                title || images || price || option || rooms || bathrooms || description ||
                state || town
            ) {
                const formData = new FormData();

                formData.append('ownerId', userId);
                formData.append('title', title);
                formData.append('price', price);
                formData.append('option', option);
                formData.append('rooms', rooms);
                formData.append('bathrooms', bathrooms);
                formData.append('description', description);
                formData.append('state', state);
                formData.append('town', town);
                formData.append('street', street);

                for (let i = 0; i < images.length; i++) {
                    formData.append('images', images[i]);
                }

                const response = await axiosApi.post(postSellingProps, formData, {
                    onUploadProgress: (progressEvent) => {
                        setProgress(prevState => {
                            return {...prevState, pc: progressEvent.progress * 100}
                        })
                    }
                });

                if (response.data) {
                    await axiosApi.post(sendPropMail, {
                        name: name, email: email, text: title,
                        subject: 'Your property has been listed for sale'
                    });
                    setSuccessMsgs('Property successfully listed for sale');
                    setIsErr(false);
                    setSuccessMsg('Upload successful.');
                    clear();
                    navigate('/buyprops');
                }
            } 
        } catch (error) {
            console.error(error);
            if (error.status === 406) {
                setErrMsg('Missing Fields');
            } else {
                setErrMsg(error.message);
            }
            setSuccessMsg('');
            setErrMsgs('Upload failed');
            setIsErr(true);
            setErrMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className='main-con create-buy-main'>
            <Link to={-1} className='nav-links'>Back</Link>
            <div className="props-form-con">
                <form 
                    className='props-form flex-col' onSubmit={handleSubmit}
                >
                    <div className="prop-con-icon flex-col">
                        <TbHomeDollar className='prop-icon' />
                    </div>
                    <h3>Upload Property For Sale</h3>
                    <p className='errMsg' aria-live='assertive'>
                        {/* {errMsg} */}
                    </p>
                    <div className="form-group flex-col">
                        <input 
                            type="text" 
                            placeholder='Property Title'
                            id='buy-title'
                            name='title'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="buy-title">
                            Title *
                        </label>
                    </div>
                    <div className="form-file-grp flex-col">
                        <input 
                            type="file" 
                            id='buy-images'
                            name='images'
                            accept='image/*'
                            multiple
                            required
                            ref={imagesRef}
                            onChange={(e) => setImages(e.target.files || e.target.files[0])}
                        />
                        <label htmlFor="buy-images" className='file-label flex-cen'>
                            <BsFillImageFill className='form-group-icon' />
                            Select a min of 1 image & a max of 10 images
                        </label>
                    </div>
                    <div className="form-group flex-col">
                        <span className='prop-icon-span'>
                            <PiCurrencyNgnDuotone className='prop-span-icon' />
                        </span>
                        <input 
                            type="number" 
                            placeholder='Insert Price'
                            id='buy-price' 
                            name='price'
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label htmlFor="buy-price">
                            Property Price *
                        </label>
                    </div>
                    <div className="form-period flex-col">
                        <label htmlFor="buy-options">
                            Sale Options *
                        </label>
                        <select 
                            name="options" id="buy-options" required
                            onChange={(e) => setOption(e.target.value)}
                        >
                            <option value="">Select Options</option>
                            <option value="Negotiable">Negotiable</option>
                            <option value="Non Negotiable">Non Negotiable</option>
                        </select>
                    </div>
                    <div className="form-group flex-col">
                        <span className='prop-icon-span'>
                            <FaBed className='prop-span-icon' />
                        </span>
                        <input 
                            type='number' 
                            placeholder='Number of bedrooms'
                            id='buy-rooms'
                            name='rooms'
                            required
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                        />
                        <label htmlFor="buy-rooms">
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
                            id='buy-bathrooms'
                            name='bathrooms'
                            required
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                        />
                        <label htmlFor="buy-bathrooms">
                            Number of bathrooms *
                        </label>
                    </div>
                    <div className="form-textarea flex-col">
                        <textarea 
                            name="description" 
                            id="buy-description" 
                            placeholder='Write Description'
                            cols="30" 
                            rows="10"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <label htmlFor="buy-description">
                            Home description [min: 20 characters] *
                        </label>
                    </div>
                    <div className="form-location flex-col">
                        <p className='prop-location'>
                            Location 
                        </p>
                        <div className="form-location-grp flex-col">
                            <label htmlFor="buy-state">State *</label>
                            <select 
                                name="state" id="buy-state" required
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">Select State</option>
                                {states.map(state => (
                                    <option value={state.name} key={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-location-grp flex-col">
                            <label htmlFor="buy-town">Town *</label>
                            <select 
                                name="town" id="buy-town" required
                                onChange={(e) => setTown(e.target.value)}
                            >
                                <option value="">Select Town</option>
                                {towns.length ? towns.map(town => (
                                    <option value={town} key={town}>
                                        {town}
                                    </option>
                                )): <option value="">...</option> }
                            </select>
                        </div>
                        <div className="form-group flex-col">
                            <input 
                                type="text" 
                                name='street'
                                id='buy-street'
                                placeholder='Home Street Details'
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <label htmlFor="buy-street">Street</label>
                        </div>
                    </div>
                    
                    <button 
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <ClipLoader /> : 'SUBMIT'}
                    </button>
                    {progress.started && (
                        <progress max='100' value={progress.pc}></progress>
                    )}
                    <p className='success-msg'>
                        {successMsg}
                    </p>
                    <p className='errMsg'>
                        {errMsg}
                    </p>
                </form>
            </div>
        </main>
    );
}

export default CreateBuy;