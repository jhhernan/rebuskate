import logo from './logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import './App.css';
import * as S from './styled';

import Button from './components/Button';
import Form from './components/Form';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const Logout = () => {
  const signOut = useSignOut()
  const navigate = useNavigate();

  const onSubmit = () => {
    signOut();
    navigate("/");
  }
  
  const auth = useAuthUser();
  const authHeader = useAuthHeader()

  console.log('Testing v1:', auth);

console.log('Testing v2:', authHeader);
  
  return (
    <>
            {/* <Link to="/">
          <S.Title>REBUSKATE.com</S.Title>
        </Link> */}
    <div className="App">
      <header className="App-header1">
        <Link to="/">
          {/* <S.Title>REBUSCATE.com</S.Title> */}
          <S.Title>rebuscate<span style={{ "color": "black" }}>.com</span></S.Title>
        </Link>

      </header>
    </div>

    <div style={{  "display": "flex",
    "flex-direction": "column", 
      // "border": "1px solid red",
      // "justify-content": "center",
      "align-items": "center",
      "padding": "1rem",
      "height": "100vh",
      "padding-left": "40px",
      "padding-right": "40px",

      }}>

      <Form title='Salir de Sesion'>
        <div>Prueba:{auth.user}</div>
        <div>Prueba2:{authHeader}</div>

        <Button title="Salir" type='button' onClick={()=>{onSubmit()}}/>
      </Form>

      <br />
     </div>
    </>
  );
  
}

export default Logout;
