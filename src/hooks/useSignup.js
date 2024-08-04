import { useAuthContext } from './useAuthContext';
import { useContext, useState } from 'react';

export const useSignup = () => {

    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);

    const signup = async ({name, lastName, email, password}) => {
        console.log('Intenatmdo con:', email, password)
        setIsLoading(true);
        setError(null);

        const response = await fetch('/users/signup', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({name, lastName, email, password})
        });

        const json = await response.json();

        if (!response.ok){
            setIsLoading(false);
            setError(json.error);
            console.log('Ha ocurrido un error v1', json.error)
        }

        if (response.ok){
            console.log('El json es:', json);
            localStorage.setItem('user', JSON.stringify(json));

            //Aqui faltaria algo...

            setIsLoading(false);
        }
    }

    return {signup, isLoading, error };

}