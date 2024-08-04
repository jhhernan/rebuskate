
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
// Este Ejemplo fue de https://www.youtube.com/watch?v=nI8PYZNFtac&t=1814s
//https://github.com/gitdagray/react_jwt_auth/blob/main/src/context/AuthProvider.js