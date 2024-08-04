import axios from '../api/axios';
import useAuth from './useAuth';


const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        // const response = await axios.get('/users/refresh', {
        const response = await axios.get('/refresh', {

            withCredentials: true
        });

        console.log('La respuesta del refreshToken:', response.data)
        setAuth(prev => {
            console.log(JSON.stringify(prev)+' 123');
            console.log(response.data.token+' 456');
            return { ...prev, accessToken: response.data.token }
        });

        return response.data.token;
    }

    return refresh;

}


export default useRefreshToken;

