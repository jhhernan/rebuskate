import { useAuthContext } from './useAuthContext';
import useAuth from './useAuth';
import { useContext, useState } from 'react';
import axios from '../api/axios';

export const useLogin = () => {

    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);

    // const { isLoggedIn, login: authLogin } = useAuthContext();
    const { setAuth } = useAuth();


    const login = async ({email, password}) => {
        console.log('Intentando con:', email, password)
        setIsLoading(true);
        setError(null);


        // const response = await fetch('/users/signin', {
        //     method: 'POST',
        //     headers: {'Content-type': 'application/json'},
        //     body: JSON.stringify({email, password})
        // });

        try {

        
        const response = await axios.post('/users/signin',
            JSON.stringify({ email, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            // Access the Set-Cookie header from the response
            const setCookieHeader = response.headers['set-cookie'];
            
            // You can now store the cookie or use it for subsequent requests
            console.log('Cookie received:', setCookieHeader);

            console.log('El response v2 es:', response.data)
            const accessToken = response?.data?.token;
             // const roles = response?.data?.roles;
             setAuth({ email, accessToken });

        } catch (err) {
            console.log('El err es:', err.response)
            setError(err.response.data.error);
        }

        // const json = await response.json();

        // if (!response.ok){
        //     setIsLoading(false);
        //     setError(json.error);
        //     console.log('Ha ocurrido un error', json)
        // }

        // if (response.ok){
        //     console.log('El json es:', json);
        //     localStorage.setItem('user', JSON.stringify(json));

        //     const accessToken = response?.data?.token;
        //     // const roles = response?.data?.roles;
        //     setAuth({ email, accessToken });

        //     //Aqui faltaria algo...
        //     // authLogin();
        //     ////

        //     setIsLoading(false);
        // }
    }

    return {login, isLoading, error };

}