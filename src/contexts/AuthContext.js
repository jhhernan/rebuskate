import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check local storage or cookie for authentication status
//     const loggedInStatus = localStorage.getItem('isLoggedIn');
//     if (loggedInStatus) {
//       setIsLoggedIn(true);
//     }
//   }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  console.log('isLoggedIn:', isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Este Ejemplo fue de https://www.youtube.com/watch?v=3yaHWZdH0FM
