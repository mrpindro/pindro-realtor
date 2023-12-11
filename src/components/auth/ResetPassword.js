import React from 'react';
import { AiFillCheckCircle, AiFillEye, AiFillEyeInvisible, AiFillInfoCircle } from 'react-icons/ai';
import { BsFillLockFill } from 'react-icons/bs';
import { FaXmark } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import useDataContext from '../../hooks/useDataContext';
import ClipLoader from 'react-spinners/ClipLoader';
import './index.css';
import { useUpdateUserPasswordMutation } from '../../features/usersApiSlice';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
    const { showPwd, handleShowPwd } = useDataContext();
    const [updateUserPassword, {
        isLoading, isSuccess, isError, error
    }] = useUpdateUserPasswordMutation();

    const { id } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = React.useState('');
    const [validPwd, setValidPwd] = React.useState(false);
    const [pwdFocus, setPwdFocus] = React.useState(false);

    const [confirmPwd, setConfirmPwd] = React.useState('');
    const [validConfirmPwd, setValidConfirmPwd] = React.useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = React.useState(false);

    const [errMsg, setErrMsg] = React.useState('');
    const errRef = React.useRef();

    React.useEffect(() => {
        setErrMsg('');
    }, [password]);

    React.useEffect(() => {
        if (isSuccess) {
            navigate('/auth');
        }

        // eslint-disable-next-line 
    }, [isSuccess]);

    React.useEffect(() => {
        if (isError) {
            setErrMsg(error.message);
            console.log(error)
        }

        // eslint-disable-next-line 
    }, [isError]);

    React.useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);

        const confirm = password === confirmPwd;
        setValidConfirmPwd(confirm);

    }, [password, confirmPwd]);

    async function handleSubmit(e) {
        e.preventDefault();

        const v1 = PWD_REGEX.test(password);
        if (!v1) {
            setErrMsg('Invalid Entry');
            return;
        }

        try {    
            
            await updateUserPassword({ id, password });
            
        } catch (error) {
            console.log(error)
            errRef.current.focus();
        }
    }

    return (
        <div className='reset-pwd-main main-con flex-col'>
            <div className="reset-pwd-con flex-col">
                <form className='auth-form flex-col' onSubmit={handleSubmit}>
                    <h3>Reset Password</h3>
                    <p
                        ref={errRef} aria-live='assertive'
                        className='errMsg'
                    >
                        {errMsg}
                    </p>
                    <div className="form-group flex-col">
                        <label htmlFor="reset-password">
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
                            placeholder='Enter new password'
                            id='reset-password'
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
                        <label htmlFor="confirm-reset-password">
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
                            placeholder='Confirm new Password'
                            id='confirm-reset-password'
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
                            !validConfirmPwd ? 
                            true : false
                        }
                    >
                        {isLoading ? <ClipLoader /> : 'RESET'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;