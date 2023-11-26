import axios from "axios";

const BASE_URL = 'http://localhost:3500';

const axiosApi = axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});


export const signUpURL = '/users';
export const signInURL = '/auth';
export const signOutURL = '/auth/logout';

export const getRentsProps = '/rent';
export const postRentsProps = '/rent';
export const getSellingProps = '/buy';
export const postSellingProps = '/buy';


export const sendSignUpMail = '/mail';
export const sendPropMail = '/prop-mail';

export default axiosApi;