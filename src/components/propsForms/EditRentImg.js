import React from 'react';
import './index.css';
import { TbHomeDollar } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import useAuth from '../../hooks/useAuth';
import axiosApi, { getRentsProps, postRentsProps } from '../../api/axiosApi';
import { BsFillImageFill } from 'react-icons/bs';
import useTitle from '../../hooks/useTitle';

const EditRentImg = () => {
    const { userId } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useTitle(`Modify images - ${id}`);

    const [prop, setProp] = React.useState(null);

    React.useEffect(() => {
        const getPost = async () => {
            const response = await axiosApi.get(`${getRentsProps}/${id}`);
            setProp(response?.data);
        }

        getPost();
    }, [id]);

    const [images, setImages] = React.useState([]);
    const [imgsPreview, setImgsPreview] = React.useState([]);
    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState('');
    const [successMsg, setSuccessMsg] = React.useState('');
    const [progress, setProgress] = React.useState({ started: false, pc: 0});
    const imagesRef = React.useRef();
    

    React.useEffect(() => {
        if (images.length < 1) return;
        const newImages = [];
        images.forEach(img => newImages.push(URL.createObjectURL(img)));
        setImgsPreview(newImages);

        // eslint-disable-next-line 
    }, [images]);

    const clear = () => {
        imagesRef.current.files = null;
    }

    const onImageschanged = (e) => {
        setImages([...e.target.files]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setSuccessMsg('Uploading...')
        setProgress(prevState => {
            return {...prevState, started: true}
        })
        try {
            if (images) {
                const formData = new FormData();

                formData.append('ownerId', userId);

                for (let i = 0; i < images.length; i++) {
                    formData.append('images', images[i]);
                }

                const response = await axiosApi.put(`${postRentsProps}/${id}`, formData, {
                    onUploadProgress: (progressEvent) => {
                        setProgress(prevState => {
                            return {...prevState, pc: progressEvent.progress * 100}
                        })
                    }
                });

                if (response.data) {
                    setSuccessMsg('Upload successful.');
                    alert('Property Images Updated');
                    clear();
                    navigate(`/rentprops/${id}`);
                }
            } 
        } catch (error) {
            console.error(error);
            setErrMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className='main-con create-rent-main'>
            <Link to={-1} className='nav-links'>back</Link>
            <div className="props-form-con">
                <form 
                    className='props-form flex-col' onSubmit={handleSubmit}
                >
                    <div className="prop-con-icon flex-col">
                        <TbHomeDollar className='prop-icon' />
                    </div>
                    <h3>Updating Images of Property for Rent</h3>
                    <div className="initial-imgs flex-cen">
                        <h5 className='flex-cen'>Current Images</h5>
                        {prop?.images.map((img, i) => (
                            <img src={img} alt="currImg" key={i} />
                        ))}
                    </div>
                    <div className="prop-imgs-upload-preview">
                        <h5 className='flex-cen'>Selected Images</h5>
                        {imgsPreview.length ? imgsPreview.map((img, i) => (
                            <img src={img} alt="imgPreview" key={i} />
                        )) : <p>No new image selected</p> }
                    </div>
                    <div className="form-file-grp flex-col">
                        <input 
                            type="file" 
                            id='edit-rent-images'
                            name='images'
                            accept='image/*'
                            multiple
                            required
                            ref={imagesRef}
                            onChange={onImageschanged}
                        />
                        <label htmlFor="edit-rent-images" className='file-label flex-col'
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <BsFillImageFill className='form-group-icon' />
                            * Select a min of 1 image & a max of 10 images. <br />
                            * Updating your property images means deleting
                            the current ones.
                        </label>
                    </div>
                    
                    <button 
                        type='submit'
                        disabled={!images || isLoading}
                    >
                        {isLoading ? <ClipLoader /> : 'SUBMIT MODIFICATION'}
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

export default EditRentImg;