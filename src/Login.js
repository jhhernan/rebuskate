import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import './App.css';
import * as S from './styled';

import Button from './components/Button';
import Form from './components/Form';
import ErrorLabel from './components/ErrorLabel';
import InputField from './components/InputField';
import InputPassword from './components/InputPassword';

import axios from './api/axios';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessage, setErrorMessage ] = useState("");
  const [info, setInfo] = useState({});

  const onSubmit = async(event) => {
    event.preventDefault();

    if (!info.email || !info.password) {
      setErrorMessage('Ingresa correo electronico y clave');
      return;
    }

    setErrorMessage("");

    axios.post(process.env.REACT_APP_BACKEND_SERVER + '/users/signin',
    { email: info.email, password: info.password })
    .then((res)=>{
        if(res.status === 200){
            if(signIn({
                auth: {
                    token: res.data.token,
                    type: 'Bearer',
                    authState: { "email": info.email },
                },
                // refresh: res.data.refreshToken
                userState: res.data.authUserState
            })){ // Only if you are using refreshToken feature
                // Redirect or do-something
            }
            else {
                //Throw error
                console.log('Error!!!!!!!!!!');
            }
            const searchParams = new URLSearchParams(location.search);
            const redirect = searchParams.get('redirect') || '/';
            // navigate("/");
            navigate(redirect);
        }
    })
    .catch((err)=>{
      console.log('Error')
      setErrorMessage('Revise sus credenciales');
    })

  }

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

      <Form title='Iniciar sesión' onSubmit={onSubmit}>
        <InputField label={"Correo electrónico"} onChange={ e => {setInfo({...info, email: e.target.value})}}/>
        <InputPassword label={"Clave"} type="password"
            onChange={ e => {setInfo({...info, password: e.target.value})}}/>
              {errorMessage && ( <ErrorLabel label={errorMessage} /> )}
        <Button title="Ingresar" type='submit'/>
      </Form>
      <div>No tienes usuario? <a href={"/preregister"}>Regístrate</a></div>

      <br />
      </S.AuthShell>
    </div>
  );
  
}

export default Login;
