import React from 'react';
import './index.css';
import { BsFillEnvelopeAtFill, BsFillLockFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { 
    AiFillCheckCircle, AiFillEye, AiFillEyeInvisible, AiFillInfoCircle, AiFillPhone 
} from 'react-icons/ai';
import { FaXmark } from 'react-icons/fa6';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
    useDeleteUserMutation, useUpdateUserMutation 
} from '../../features/usersApiSlice';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const FNAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,24}$/;
const LNAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EditUser = () => {
    const { name, email: uEmail, phoneNum: uPhoneNum } = useAuth();
    const { id } = useParams();

    useTitle(`Edit account - ${name}`);
    
    const navigate = useNavigate();

    // const { user } = useGetUsersQuery('usersList', {
    //     selectFromResult: ({ data }) => ({
    //         user: data?.entities[userId]
    //     })
    // });
    const [updateUser, {isLoading, isSuccess, isError, error}] = useUpdateUserMutation();
    const [deleteUser, {isSuccess: delSuccess}] = useDeleteUserMutation();

    const fNameRef = React.useRef();
    const lNameRef = React.useRef();
    const errRef = React.useRef();

    const [firstname, setFirstname] = React.useState(name.split(' ')[0]);
    const [validFname, setValidFname] = React.useState(false);
    const [fnameFocus, setFnameFocus] = React.useState(false);

    const [lastname, setlastname] = React.useState(name.split(' ')[1]);
    const [validLname, setValidLname] = React.useState(false);
    const [lnameFocus, setlnameFocus] = React.useState(false);

    const [password, setPassword] = React.useState('');
    const [validPwd, setValidPwd] = React.useState(false);
    const [pwdFocus, setPwdFocus] = React.useState(false);

    const [confirmPwd, setConfirmPwd] = React.useState('');
    const [validConfirmPwd, setValidConfirmPwd] = React.useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = React.useState(false);

    const [email, setEmail] = React.useState(uEmail);
    const [phoneNum, setPhoneNum] = React.useState(uPhoneNum);

    const [showPwd, setShowPwd] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');
    const [isDel, setisDel] = React.useState(false);

    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [updatePwd, setUpdatePwd] = React.useState(false);

    const handleShowPwd = () => {
        if (showPwd) {
            return setShowPwd(false)
        }
        setShowPwd(true);
    }

    const showPwdInputs = () => {
        if (updatePwd) {
            return setUpdatePwd(false);
        } 
        setUpdatePwd(true);
    }

    const showDel = () => {
        if (isDel) {
            return setisDel(false);
        }
        setisDel(true);
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
    }, [lastname, firstname, phoneNum, password, confirmPwd]);

    React.useEffect(() => {
        if (delSuccess) {
            window.location.reload();
        }
    }, [delSuccess]);

    React.useEffect(() => {
        if (isSuccess) {
            alert('User data updated successfully');
            navigate('/');
            window.location.reload();
        }

        // eslint-disable-next-line 
    }, [isSuccess]);

    if (isError) {
        setErrMsg(error);
        console.log(error);
    }

    // if (isSuccess) {
    //     alert('User data updated successfully');
    //     navigate('/');
    //     window.location.reload();
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        // if button enabled with JS hack
        const v1 = FNAME_REGEX.test(firstname);
        const v2 = LNAME_REGEX.test(lastname);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }

        try { 
            if (password) {
                const v3 = PWD_REGEX.test(password);
                if (!v3) {
                    setErrMsg('Invalid Entry');
                    return;
                }

                await updateUser({ id, firstname, lastname, email, phoneNum, password });
            } else {
                await updateUser({ id, firstname, lastname, email, phoneNum });
            }


        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response.status === 409) {
                return setErrMsg('User Already Exist');
            }
            setErrMsg('Registration Failed');
            errRef.current.focus();
        } 
    }

    const handleDelete = async () => {
        try {
            await deleteUser(id);
        } catch (error) {
            console.log(error);
            alert('Failed to delete account');
        }
    }

    return (
        <main className="edit-user-main flex-col">
            <Link to={- 1} className='nav-links nav-back'>Back</Link>
            <div className="edit-user-con flex-col">
                <form 
                    className='edit-user-form flex-col' onSubmit={handleSubmit}
                >
                    <h3>MODIFY ACCOUNT</h3>
                    <p ref={errRef} className='errMsg' aria-live='assertive'>
                        {errMsg}
                    </p>
                    <div className="form-group flex-col">
                        <label htmlFor="edit-firstname">
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
                            id='edit-firstname'
                            name='firstname'
                            required
                            value={firstname}
                            ref={fNameRef}
                            aria-invalid={validFname ? 'false' : 'true'}
                            aria-describedby='edit-fnameidnote'
                            onChange={(e) => setFirstname(e.target.value)}
                            onFocus={() => setFnameFocus(true)}
                            onBlur={() => setFnameFocus(false)}
                        />
                        <p 
                            id='edit-fnameidnote' 
                            className={fnameFocus && firstname && !validFname ? 
                                'input-alert flex-cen' : 'off-screen'
                            }
                        >
                            <AiFillInfoCircle className='form-group-icon' />
                            3 to 25 characters
                        </p>
                    </div>
                    <div className="form-group flex-col">
                        <label htmlFor="edit-lastname">
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
                            id='edit-lastname' 
                            name='lastname'
                            required
                            value={lastname}
                            ref={lNameRef}
                            aria-invalid={validFname ? 'false' : 'true'}
                            aria-describedby='edit-lnameidnote'
                            onChange={(e) => setlastname(e.target.value)}
                            onFocus={() => setlnameFocus(true)}
                            onBlur={() => setlnameFocus(false)}
                        />
                        <p 
                            id='edit-lnameidnote' 
                            className={lnameFocus && lastname && !validLname ? 
                                'input-alert flex-cen' : 'off-screen'
                            }
                        >
                            <AiFillInfoCircle className='form-group-icon' />
                            3 to 25 characters
                        </p>
                    </div>
                    <div className="form-group flex-col">
                        <label htmlFor="edit-email">
                            <BsFillEnvelopeAtFill className='form-group-icon' />
                        </label>
                        <input 
                            type="email" 
                            id='edit-email'
                            name='email'
                            placeholder='Email'
                            required
                            autoComplete='off'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group flex-col">
                        <label htmlFor="edit-phone-num">
                            <AiFillPhone className='form-group-icon' />
                        </label>
                        <input 
                            type='text' 
                            placeholder='Phone Number'
                            id='edit-phone-num'
                            name='phoneNum'
                            required
                            autoComplete='off'
                            title='Phone Number'
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                        />
                    </div>
                    <h6 className='pwd-inputs-btn' onClick={showPwdInputs}>
                        Click to update password [optional]
                    </h6>
                    {updatePwd && (
                        <>
                            <p className='edit-pwd-title'>Update password?</p>
                            <div className="edit-pwd-sec">
                                <p>Updating your password is optional.</p>
                            </div>
                            <div className="form-group flex-col">
                                <label htmlFor="edit-password">
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
                                    id='edit-password'
                                    name='password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-invalid={validPwd ? 'false' : 'true'}
                                    aria-describedby='edit-pwdnote'
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
                                id='edit-pwdnote' 
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
                                <label htmlFor="edit-confirm-password">
                                    <BsFillLockFill className='form-group-icon' />
                                    <FaXmark 
                                        className={!confirmPwd || validConfirmPwd ? 
                                            'hide' : 'invalid-input'
                                        }
                                    />
                                    <AiFillCheckCircle
                                        className={confirmPwd && validConfirmPwd  ? 
                                            'valid-input' : 'hide'
                                        }
                                    />
                                </label>
                                <input 
                                    type={showPwd ? 'text' : 'password'} 
                                    placeholder='Confirm Password'
                                    id='edit-confirm-password'
                                    onChange={(e) => setConfirmPwd(e.target.value)}
                                    aria-invalid={validConfirmPwd ? 'false' : 'true'}
                                    aria-describedby='edit-confirmpwdnote'
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
                                id='edit-confirmpwdnote' 
                                className={confirmPwdFocus && !validConfirmPwd ? 
                                    'pwd-alert flex-cen' : 'pwd-offscreen'
                                }
                            >
                                <AiFillInfoCircle className='form-group-icon' />
                                Must match the first password input field.
                            </p>
                        </>
                    )}
                    <button 
                        type='submit'
                        disabled={
                            !validFname || !validLname || !email ? 
                            true : false
                        }
                    >
                        {isLoading ? <ClipLoader /> : 'SUBMIT MODIFICATION'}
                    </button>
                    <p 
                        className={
                            (formSubmitted) && 
                            (!validFname || !validLname || !email) 
                            ? 'form-validation' : 'pwd-offscreen'
                        }
                    >
                        All fields required
                    </p>
                </form>
                <div className="delete-acct flex">
                    {!isDel && (
                        <h5 onClick={showDel}>delete account</h5>
                    )}
                    {isDel && (
                        <div className="del-options flex-col">
                            <p>Are you sure?</p>
                            <div className="del-yes-no flex">
                                <button onClick={showDel}>No, cancel</button>
                                <button onClick={handleDelete}>Yes, delete</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default EditUser;