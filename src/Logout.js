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
    <div className="App">
      <S.BrandHeader>
        <Link to="/">
          <S.BrandMark>
            <S.BrandDot>R</S.BrandDot>
            <S.BrandName>rebuscate<span>.com</span></S.BrandName>
          </S.BrandMark>
        </Link>
      </S.BrandHeader>

      <S.AuthShell>

      <Form title='Salir de sesión'>
        <div>Prueba:{auth.user}</div>
        <div>Prueba2:{authHeader}</div>

        <Button title="Salir" type='button' onClick={()=>{onSubmit()}}/>
      </Form>

      <br />
      </S.AuthShell>
    </div>
  );
  
}

export default Logout;
