import React from 'react';
import './index.css';
import { BsFillImageFill } from 'react-icons/bs';
import { TbHomeDollar } from 'react-icons/tb';
import { PiCurrencyNgnDuotone } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { statesData } from '../../utils/data';
import axiosApi, { postRentsProps, sendPropMail} from '../../api/axiosApi';
import ClipLoader from 'react-spinners/ClipLoader';
import useAuth from '../../hooks/useAuth';
import { FaBed, FaShower } from 'react-icons/fa';
import useDataContext from '../../hooks/useDataContext';
import useTitle from '../../hooks/useTitle';

const CreateRent = () => {
    useTitle('List property for rent');

    const navigate = useNavigate();

    const { userId, name, email } = useAuth();
    const {setErrMsgs, setSuccessMsgs, setIsErr} = useDataContext();


    const states = statesData;
    const imagesRef = React.useRef();
    const [title, setTitle] = React.useState('');
    const [images, setImages] = React.useState(null);
    const [fee, setFee] = React.useState(0);
    const [period, setPeriod] = React.useState('');
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
        setFee(0);
        setPeriod('');
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
                title || images || fee || period || rooms || bathrooms || description ||
                state || town
            ) {
                const formData = new FormData();

                formData.append('ownerId', userId);
                formData.append('title', title);
                formData.append('fee', fee);
                formData.append('period', period);
                formData.append('rooms', rooms);
                formData.append('bathrooms', bathrooms);
                formData.append('description', description);
                formData.append('state', state);
                formData.append('town', town);
                formData.append('street', street);

                for (let i = 0; i < images.length; i++) {
                    formData.append('images', images[i]);
                }

                const response = await axiosApi.post(postRentsProps, formData, {
                    onUploadProgress: (progressEvent) => {
                        setProgress(prevState => {
                            return {...prevState, pc: progressEvent.progress * 100}
                        })
                    }
                });

                if (response.data) {
                    await axiosApi.post(sendPropMail, {
                        name: name, email: email, text: title,
                        subject: 'Your property has been listed for rent'
                    });
                    setSuccessMsgs('Property successfully listed for rent');
                    setIsErr(false);
                    setSuccessMsg('Upload successful.');
                    setErrMsg('');
                    clear();
                    navigate('/rentprops');
                }
            } 
        } catch (error) {
            console.error(error);
            setSuccessMsg('');
            setIsErr(true);
            setErrMsgs('Upload failed');
            if (error.status === 406) {
                setErrMsg('Missing Fields');
            } else {
                setErrMsg(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className='main-con create-rent-main'>
            <Link to={-1} className='nav-links'>Back</Link>
            <div className="props-form-con">
                <form 
                    className='props-form flex-col' onSubmit={handleSubmit}
                >
                    <div className="prop-con-icon flex-col">
                        <TbHomeDollar className='prop-icon' />
                    </div>
                    <h3>Upload Property For Rent</h3>
                    <div className="form-group flex-col">
                        <input 
                            type="text" 
                            placeholder='Property title'
                            id='rent-title'
                            name='title'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="rent-title">
                            Title *
                        </label>
                        {/* <p>
                            <AiFillInfoCircle className='form-group-icon' />
                            3 to 25 characters
                        </p> */}
                    </div>
                    <div className="form-file-grp flex-col">
                        <input 
                            type="file" 
                            id='rent-images'
                            name='images'
                            accept='image/*'
                            multiple
                            required
                            ref={imagesRef}
                            onChange={(e) => setImages(e.target.files || e.target.files[0])}
                        />
                        <label htmlFor="rent-images" className='file-label flex-cen'>
                            <BsFillImageFill className='form-group-icon' />
                            Upload a min of 1 image & a max of 10 images
                        </label>
                    </div>
                    <div className="form-group flex-col">
                        <span className='prop-icon-span'>
                            <PiCurrencyNgnDuotone className='prop-span-icon' />
                        </span>
                        <input 
                            type="number" 
                            placeholder='Insert Price'
                            id='rent-fee' 
                            name='fee'
                            required
                            value={fee}
                            onChange={(e) => setFee(e.target.value)}
                        />
                        <label htmlFor="rent-fee">
                            Rent Price *
                        </label>
                        {/* <p>
                            <AiFillInfoCircle className='form-group-icon' />
                            3 to 25 characters
                        </p> */}
                    </div>
                    <div className="form-period flex-col">
                        <label htmlFor="rent-period">
                            Period *
                        </label>
                        <select 
                            name="period" id="rent-period" required
                            onChange={(e) => setPeriod(e.target.value)}
                        >
                            <option value="">Select Period</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Annually">Annually</option>
                        </select>
                    </div>
                    <div className="form-group flex-col">
                        <span className='prop-icon-span'>
                            <FaBed className='prop-span-icon' />
                        </span>
                        <input 
                            type='number' 
                            placeholder='Number of bedrooms'
                            id='rent-rooms'
                            name='rooms'
                            required
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                        />
                        <label htmlFor="rent-rooms">
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
                            id='rent-bathrooms'
                            name='bathrooms'
                            required
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                        />
                        <label htmlFor="rent-bathrooms">
                            Number of bathrooms *
                        </label>
                    </div>
                    <div className="form-textarea flex-col">
                        <textarea 
                            name="description" 
                            id="rent-description" 
                            placeholder='Write Description'
                            cols="30" 
                            rows="10"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <label htmlFor="rent-description">
                            Home description: [min: 20 characters] *
                        </label>
                    </div>
                    <div className="form-location flex-col">
                        <p className='prop-location'>
                            Location 
                        </p>
                        <div className="form-location-grp flex-col">
                            <label htmlFor="rent-state">State *</label>
                            <select name="state" id="rent-state" required
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
                            <label htmlFor="rent-town">Town *</label>
                            <select 
                                name="town" id="rent-town" required
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
                                id='rent-street'
                                placeholder='Home Street Details'
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <label htmlFor="rent-street">Street</label>
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

export default CreateRent;