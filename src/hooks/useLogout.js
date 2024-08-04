import { useAuthContext } from './useAuthContext';

export const useLogout = () => {

    const logout = async () => {

        localStorage.removeItem('user');

    }

    return { logout };

}