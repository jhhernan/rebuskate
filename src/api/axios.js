import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.1.10:81'
});


export const axiosPrivate = axios.create({
    // baseURL: 'http://192.168.1.10:81',
    baseURL: process.env.REACT_APP_BACKEND_SERVER,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false
});