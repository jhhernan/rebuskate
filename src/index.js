import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import { AuthContextProvider} from './contexts/AuthContext'
// import { AuthProvider} from './contexts/AuthProvider'
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:'
 });
 
root.render(
  <React.StrictMode>
    <AuthProvider
      store={store}
      authType={"cookie"}
      // authName={"_auth"}
      // cookieDomain={window.location.hostname}
      // cookieSecure={false}
    >
    {/* <AuthContextProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </AuthContextProvider> */}
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
