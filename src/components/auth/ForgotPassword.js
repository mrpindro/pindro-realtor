import React from 'react';
import { BsFillEnvelopeAtFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import useUsers from '../../hooks/useUsers';
import axiosApi, { sendPropMail } from '../../api/axiosApi';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [users] = useUsers();
    const [email, setEmail] = React.useState('');
    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const emailRef = React.useRef();
    const errRef = React.useRef();

    React.useEffect(() => {
        emailRef.current.focus();
    }, []);

    React.useEffect(() => {
        setErrMsg('');
    }, [email]);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {    
            const userEmails = users.map(user => {
                return user.email;
            });
    
            const user = users.find(user => {
                return user.email === email;
            });
    
            console.log(user);
    
            if (userEmails.includes(email)) {
                console.log('Found');
                await axiosApi.post(sendPropMail, {
                    email: email, name: user.name, 
                    text: `here's a link to reset your password:  
                        http://localhost:3000/reset-password/${user._id}`
                    ,
                    subject: 'Reset your password'
                });
    
                navigate('/auth');
    
                setErrMsg('');
            } else {
                console.log('No user found');
                setErrMsg('User not found');
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            errRef.current.focus();
            setIsLoading(false)
        }
    }

    return (
        <div className='main-con forgot-pwd-main flex-col'>
            <Link to={-1} className='nav-links nav-back'>← Back</Link>
            <div className="forgot-pwd-con">
                <form className='auth-form flex-col' onSubmit={handleSubmit}>
                    <h3>Forgot Password</h3>
                    <p
                        ref={errRef} aria-live='assertive'
                        className='errMsg'
                    >
                        {errMsg}
                    </p>
                    <div className="form-group flex-col">
                        <label htmlFor="forgot-email">
                            <BsFillEnvelopeAtFill className='form-group-icon' />
                        </label>
                        <input 
                            required
                            type="email" 
                            id='forgot-email'
                            name='email'
                            placeholder='Your email'
                            autoComplete='off'
                            ref={emailRef}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='login-btn'>
                        {isLoading ? <ClipLoader /> : 'Send'}
                    </button>

                    <div className="toggle-modal flex-cen">
                        Don't yet have an account?  
                        <span onClick={() => navigate('/auth')}>Register</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;