import React from 'react';
import './index.css';
import { BsFillEnvelopeAtFill, BsFillLockFill } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaXmark } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../../features/authSlice';
import { useLoginMutation } from '../../features/authApiSlice';
import { useDispatch } from 'react-redux';
import usePersist from '../../hooks/usePersist';

const SignIn = ({toggleRgister, closeModal}) => {
    const [login, { isLoading }] = useLoginMutation()
    const [persist, setPersist] = usePersist();
    const emailRef = React.useRef();
    const errRef = React.useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [showPwd, setShowPwd] = React.useState(false);
    // const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errMsg, setErrMsg] = React.useState('');

    const handleShowPwd = () => {
        if (showPwd) {
            return setShowPwd(false)
        }
        setShowPwd(true);
    }

    React.useEffect(() => {
        emailRef.current.focus();
    }, []);

    React.useEffect(() => {
        setErrMsg('');
    }, [password, email]);

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { accessToken } = await login({ email, password }).unwrap();

            dispatch(setCredentials({ accessToken }));

            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            if (!error?.data) {
                setErrMsg('No Server Response');
            } else if (error?.status === 406) {
                setErrMsg('Missing Email or Password');
            } else if (error?.status === 401) {
                setErrMsg('Incorrect password o email');
            } else if (error?.status === 404) {
                setErrMsg('No user found');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <form className='auth-form flex-col' onSubmit={handleSubmit}>
            <div className="close-modal flex-cen" onClick={closeModal}>
                <FaXmark className='form-icon' />
            </div>
            <h3>Login</h3>
            <p
                ref={errRef} aria-live='assertive'
                className='errMsg'
            >
                {errMsg}
            </p>
            <div className="form-group flex-col">
                <label htmlFor="login-email">
                    <BsFillEnvelopeAtFill className='form-group-icon' />
                </label>
                <input 
                    required
                    type="email" 
                    id='login-email'
                    name='email'
                    placeholder='Email'
                    autoComplete='off'
                    ref={emailRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group flex-col">
                <label htmlFor="login-password">
                    <BsFillLockFill className='form-group-icon' />
                </label>
                <input
                    required 
                    type={showPwd ? 'text' : 'password'} 
                    placeholder='Password'
                    id='login-password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="lock-pswd" onClick={handleShowPwd}>
                    {showPwd ? (
                        <AiFillEyeInvisible className='form-group-icon' />
                    ) : (
                        <AiFillEye className='form-group-icon' />
                    )}
                </div>
            </div>
            <div className="form-persist flex" style={{width: '100%'}}>
                <input 
                    type="checkbox" 
                    id='persist'
                    value={persist}
                    onChange={togglePersist}
                />
                <label htmlFor="persist">Remember Me</label>
            </div>
            <button type='submit' className='login-btn'>
                {isLoading ? <ClipLoader /> : 'SIGN IN'}
            </button>

            <div className="toggle-modal flex-cen">
                Don't yet have an account?  
                <span onClick={toggleRgister}>Register</span>
            </div>
        </form>
    );
}

export default SignIn;