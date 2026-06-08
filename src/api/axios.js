import axios from 'axios';

export default axios.create({
    baseURL: ''
});


export const axiosPrivate = axios.create({
    // baseURL: '',
    baseURL: process.env.REACT_APP_BACKEND_SERVER,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false
});