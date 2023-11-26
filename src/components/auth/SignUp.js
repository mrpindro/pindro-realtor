import React from 'react';
import './index.css';
import { BsFillEnvelopeAtFill, BsFillImageFill, BsFillLockFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { 
    AiFillCheckCircle, AiFillEye, AiFillEyeInvisible, AiFillInfoCircle, AiFillPhone 
} from 'react-icons/ai';
import { FaXmark } from 'react-icons/fa6';
import ClipLoader from 'react-spinners/ClipLoader';
import axiosApi, { sendSignUpMail, signUpURL } from '../../api/axiosApi';

const FNAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,24}$/;
const LNAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = ({toggleLogin, closeModal}) => {
    const fNameRef = React.useRef();
    const lNameRef = React.useRef();
    const errRef = React.useRef();

    const [firstname, setFirstname] = React.useState('');
    const [validFname, setValidFname] = React.useState(false);
    const [fnameFocus, setFnameFocus] = React.useState(false);

    const [lastname, setlastname] = React.useState('');
    const [validLname, setValidLname] = React.useState(false);
    const [lnameFocus, setlnameFocus] = React.useState(false);

    const [password, setPassword] = React.useState('');
    const [validPwd, setValidPwd] = React.useState(false);
    const [pwdFocus, setPwdFocus] = React.useState(false);

    const [confirmPwd, setConfirmPwd] = React.useState('');
    const [validConfirmPwd, setValidConfirmPwd] = React.useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState(0);
    const [image, setImage] = React.useState(null);

    const [showPwd, setShowPwd] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    const handleShowPwd = () => {
        if (showPwd) {
            return setShowPwd(false)
        }
        setShowPwd(true);
    }

    React.useEffect(() => {
        fNameRef.current.focus();
        lNameRef.current.focus();
    }, [fNameRef, lNameRef]);

    React.useEffect(() => {
        const result = FNAME_REGEX.test(firstname);
        setValidFname(result);
    }, [firstname]);

    React.useEffect(() => {
        const result = LNAME_REGEX.test(lastname);
        setValidLname(result);
    }, [lastname]);

    React.useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);

        const confirm = password === confirmPwd;
        setValidConfirmPwd(confirm);

    }, [password, confirmPwd]);

    React.useEffect(() => {
        setErrMsg('');
    }, [lastname, firstname, phoneNum, image, password, confirmPwd]);

    React.useEffect(() => {
        if (success) {
            alert('Sign up success!')
        }
    }, [success]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        // if button enabled with JS hack
        const v1 = FNAME_REGEX.test(firstname);
        const v2 = LNAME_REGEX.test(lastname);
        const v3 = PWD_REGEX.test(password);
        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid Entry');
            return;
        }

        const formData = new FormData();

        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('image', image);
        formData.append('phoneNum', phoneNum);
        formData.append('password', password);

        setIsLoading(true);
        try { 
            const response = await axiosApi.post(signUpURL, formData);
            
            if (response.data) {
                await axiosApi.post(sendSignUpMail, {firstname, lastname, email})
                setIsLoading(false);
                setSuccess(true);
                toggleLogin();
            }

            // console.log(response.data);
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response.status === 409) {
                return setErrMsg('User Already Exist');
            }
            setErrMsg('Registration Failed');
            setIsLoading(false);
            setSuccess(false);
            errRef.current.focus();
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form 
            className='auth-form flex-col' onSubmit={handleSubmit}
        >
            <div className="close-modal flex-cen" onClick={closeModal}>
                <FaXmark className='form-icon' />
            </div>
            <h3>REGISTER</h3>
            <p ref={errRef} className='errMsg' aria-live='assertive'>
                {errMsg}
            </p>
            <div className="form-group flex-col">
                <label htmlFor="firstname">
                    <FaUser className='form-group-icon' />
                    <FaXmark 
                        className={validFname || !firstname ? 'hide' : 'invalid-input'} 
                    />
                    <AiFillCheckCircle
                        className={validFname ? 'valid-input' : 'hide'} 
                    />
                </label>
                <input 
                    type="text" 
                    placeholder='First Name'
                    id='firstname'
                    name='firstname'
                    required
                    value={firstname}
                    ref={fNameRef}
                    aria-invalid={validFname ? 'false' : 'true'}
                    aria-describedby='fnameidnote'
                    onChange={(e) => setFirstname(e.target.value)}
                    onFocus={() => setFnameFocus(true)}
                    onBlur={() => setFnameFocus(false)}
                />
                <p 
                    id='fnameidnote' 
                    className={fnameFocus && firstname && !validFname ? 
                        'input-alert flex-cen' : 'off-screen'
                    }
                >
                    <AiFillInfoCircle className='form-group-icon' />
                    3 to 25 characters
                </p>
            </div>
            <div className="form-group flex-col">
                <label htmlFor="lastname">
                    <FaUser className='form-group-icon' />
                    <FaXmark 
                        className={validLname || !lastname ? 'hide' : 'invalid-input'} 
                    />
                    <AiFillCheckCircle
                        className={validLname ? 'valid-input' : 'hide'} 
                    />
                </label>
                <input 
                    type="text" 
                    placeholder='Last Name'
                    id='lastname' 
                    name='lastname'
                    required
                    value={lastname}
                    ref={lNameRef}
                    aria-invalid={validFname ? 'false' : 'true'}
                    aria-describedby='lnameidnote'
                    onChange={(e) => setlastname(e.target.value)}
                    onFocus={() => setlnameFocus(true)}
                    onBlur={() => setlnameFocus(false)}
                />
                <p 
                    id='lnameidnote' 
                    className={lnameFocus && lastname && !validLname ? 
                        'input-alert flex-cen' : 'off-screen'
                    }
                >
                    <AiFillInfoCircle className='form-group-icon' />
                    3 to 25 characters
                </p>
            </div>
            <div className="form-group flex-col">
                <label htmlFor="register-email">
                    <BsFillEnvelopeAtFill className='form-group-icon' />
                </label>
                <input 
                    type="email" 
                    id='register-email'
                    name='email'
                    placeholder='Email'
                    required
                    autoComplete='off'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group flex-col">
                <label htmlFor="phone-num">
                    <AiFillPhone className='form-group-icon' />
                </label>
                <input 
                    type='text' 
                    placeholder='Phone Number'
                    id='phone-num'
                    name='phoneNum'
                    required
                    autoComplete='off'
                    title='Phone Number'
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                />
            </div>
            <div className="form-group flex-col">
                <label htmlFor="register-image" className='file-label'>
                    <BsFillImageFill className='form-group-icon' />
                </label>
                <input 
                    type="file" 
                    id='register-image'
                    name='image'
                    accept='image/*'
                    multiple={false}
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <div className="form-group flex-col">
                <label htmlFor="register-password">
                    <BsFillLockFill className='form-group-icon' />
                    <FaXmark 
                        className={validPwd || !password ? 'hide' : 'invalid-input'} 
                    />
                    <AiFillCheckCircle
                        className={validPwd ? 'valid-input' : 'hide'} 
                    />
                </label>
                <input 
                    type={showPwd ? 'text' : 'password'} 
                    placeholder='Password'
                    id='register-password'
                    name='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <div className="lock-pswd" onClick={handleShowPwd}>
                    {showPwd ? (
                        <AiFillEyeInvisible className='form-group-icon' />
                    ) : (
                        <AiFillEye className='form-group-icon' />
                    )}
                </div>
            </div>
            <p 
                id='pwdnote' 
                className={pwdFocus && !validPwd ? 
                    'pwd-alert flex-cen' : 'pwd-offscreen'
                }
            >
                <AiFillInfoCircle className='form-group-icon' />
                8 to 25 characters, <br />
                must include uppercase and lowercase letters,
                a number <br /> and a special character.
            </p>
            <div className="form-group flex-col">
                <label htmlFor="confirm-password">
                    <BsFillLockFill className='form-group-icon' />
                    <FaXmark 
                        className={!confirmPwd || validConfirmPwd ? 'hide' : 'invalid-input'} 
                    />
                    <AiFillCheckCircle
                        className={confirmPwd && validConfirmPwd  ? 'valid-input' : 'hide'} 
                    />
                </label>
                <input 
                    type={showPwd ? 'text' : 'password'} 
                    placeholder='Confirm Password'
                    id='confirm-password'
                    // value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    aria-invalid={validConfirmPwd ? 'false' : 'true'}
                    aria-describedby='confirmpwdnote'
                    onFocus={() => setConfirmPwdFocus(true)}
                    onBlur={() => setConfirmPwdFocus(false)}
                />
                <div className="lock-pswd" onClick={handleShowPwd}>
                    {showPwd ? (
                        <AiFillEyeInvisible className='form-group-icon' />
                    ) : (
                        <AiFillEye className='form-group-icon' />
                    )}
                </div>
            </div>
            <p 
                    id='confirmpwdnote' 
                    className={confirmPwdFocus && !validConfirmPwd ? 
                        'pwd-alert flex-cen' : 'pwd-offscreen'
                    }
                >
                    <AiFillInfoCircle className='form-group-icon' />
                    Must match the first password input field.
                </p>
            <button 
                type='submit'
                disabled={
                    !validFname || !validLname || !email || !image || !validConfirmPwd ? 
                    true : false
                }
            >
                {isLoading ? <ClipLoader /> : 'SIGN UP'}
            </button>
            <p 
                className={
                    (formSubmitted) && 
                    (!validFname || !validLname || !email || !image || !validConfirmPwd) 
                    ? 'form-validation' : 'pwd-offscreen'
                }
            >
                All fields required
            </p>

            <div className="toggle-modal flex-cen">
                Already have an account?  
                <span onClick={toggleLogin}>Login</span>
            </div>
        </form>
    );
}

export default SignUp;