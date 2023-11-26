import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import homeImg from '../../img/home-img.jpeg';
import './index.css';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const { email } = useAuth();
    const [isRegister, setIsRegister] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(false);
    const navigate = useNavigate();

    const toggleLogin = () => {
        if (isLogin) {
            return setIsLogin(false);
        }
        setIsRegister(false);
        setIsLogin(true);
    }


    const closeModal = () => {
        setIsRegister(false);
        setIsLogin(false);
    }


    const toggleRegister = () => {
        if (isRegister) {
            return setIsRegister(false);
        }
        setIsLogin(false);
        setIsRegister(true);
    }

    return (
        <main className='auth-main main-con flex-col'>
            <div className="auth-con flex">
                <div className="auth-intro flex-col">
                    <p className="auth-para flex-col">
                        WELCOME TO PINDRO REALTOR,
                        <span>
                            a place to find your new peaceful abode
                        </span>
                    </p>
                    <div className="auth-img">
                        <img src={homeImg} alt="auth-img" />
                    </div>
                </div>
                <div className="auth-modals flex-col">
                    {!email ? (
                        <div className="auth-btns flex-col">
                            <button onClick={toggleLogin}>LOGIN</button>
                            <div className="auth-or flex-cen">
                                <hr /> OR <hr />
                            </div>
                            <button onClick={toggleRegister}>REGISTER</button>
                        </div>

                    ) : (
                        <div className="auth-btns flex-col">
                            <button onClick={() => navigate('/createRent')}>RENT</button>
                            <div className="auth-or flex-cen">
                                <hr /> OR <hr />
                            </div>
                            <button onClick={() => navigate('/createBuy')}>SELL</button>
                        </div>
                    )}
                    {(isLogin || isRegister) && (
                        <div className="modal-con flex-col">
                            {isLogin && (
                                <SignIn 
                                    toggleRgister={toggleRegister}
                                    closeModal={closeModal} 
                                />
                            )}
                            {isRegister && (
                                <SignUp 
                                    toggleLogin={toggleLogin} 
                                    closeModal={closeModal}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Auth;