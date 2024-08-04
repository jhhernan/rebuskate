import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider');
    }

    return context;
}

// Este ejemplo junto con /contexts/AuthContext es de https://www.youtube.com/watch?v=3yaHWZdH0FM