import React from 'react';
import './index.css';
import ClipLoader from 'react-spinners/ClipLoader';
import axiosApi, { signUpURL } from '../../api/axiosApi';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const EditUserImg = () => {
    const navigate = useNavigate();

    const { image, userId } = useAuth();

    const errRef = React.useRef();
    const [profImage, setProfImage] = React.useState(null);
    const [previewImg, setPreviewImage] = React.useState(null);

    const [errMsg, setErrMsg] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    React.useEffect(() => {
        setErrMsg('');
    }, [profImage]);

    if (success) {
        window.location.reload();
        navigate('/');
    }

    const onImageChanged = (e) => {
        setProfImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
    

        const formData = new FormData();

        formData.append('image', profImage);

        setIsLoading(true);
        try { 
            const response = await axiosApi.put(`${signUpURL}/${userId}`, formData);
            
            if (response.data) {
                setIsLoading(false);
                setSuccess(true);
            }

            // console.log(response.data);
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response.status === 404) {
                return setErrMsg('User Not Found');
            }
            setErrMsg('Image change Failed');
            setIsLoading(false);
            setSuccess(false);
            errRef.current.focus();
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="edit-user-main flex-col">
            <Link to={- 1} className='nav-links nav-back'>Back</Link>
            <div className="edit-user-con flex-col">
                <form 
                    className='edit-user-form flex-col' onSubmit={handleSubmit}
                >
                    <h4>MODIFY PROFILE IMAGE</h4>
                    <div className="curr-user-img flex-cen">
                        {image && <img src={image} alt="currImg" /> }
                    </div>
                    <hr style={{ width: '100%' }} />
                    {previewImg && 
                        <div className="curr-user-img flex-cen">
                            <img src={previewImg} alt="prevImg" /> 
                        </div>
                    }
                    <p ref={errRef} className='errMsg' aria-live='assertive'>
                        {errMsg}
                    </p>
                    <div className="form-user-img-grp flex-col">
                        <label htmlFor="edit-user-image" className='file-label'>
                            Click to select image
                            {/* <BsFillImageFill className='form-group-icon' /> */}
                        </label>
                        <input 
                            type="file" 
                            id='edit-user-image'
                            name='image'
                            accept='image/*'
                            multiple={false}
                            required
                            onChange={onImageChanged}
                        />
                    </div>
                    <button 
                        type='submit'
                        disabled={
                            !profImage ? 
                            true : false
                        }
                    >
                        {isLoading ? <ClipLoader /> : 'USE IMAGE'}
                    </button>
                    <p 
                        className={
                            (formSubmitted) && 
                            (!profImage) 
                            ? 'form-validation' : 'pwd-offscreen'
                        }
                    >
                        All fields required
                    </p>
                </form>
            </div>
        </main>
    );
}

export default EditUserImg;