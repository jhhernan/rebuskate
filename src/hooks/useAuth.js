import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;

// Este Ejemplo fue de https://www.youtube.com/watch?v=nI8PYZNFtac&t=1814s
//https://github.com/gitdagray/react_jwt_auth/blob/main/src/context/AuthProvider.js