import logo from './logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLogin } from './hooks/useLogin';
import CitySelector from './CitySelector';
import './App.css';
import * as S from './styled';

import Button from './components/Button';
import Form from './components/Form';
import ErrorLabel from './components/ErrorLabel';
import InputField from './components/InputField';
import InputPassword from './components/InputPassword';


import useRefreshToken from './hooks/useRefreshToken';

import { AxiosError } from 'axios';
import axios from './api/axios';
import useAuth from './hooks/useAuth';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);


  const { setAuth } = useAuth();

  const [errorMessage, setErrorMessage ] = useState("");

  const onSubmit = async(info) => {


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

            navigate("/");
        }
    })
    .catch((err)=>{
      console.log('Error')
      setErrorMessage('Revise sus credenciales');
    })

    // setErrorMessage("");

    // try {
    //   const response = await axios.post(
    //     process.env.REACT_APP_BACKEND_SERVER + '/users/signin',
    //     { email: info.email, password: info.password },
    //   );
    // }catch(err){
    //   if (err && err instanceof AxiosError) setErrorMessage(err.response?.data.message);
    //   else if (err && err instanceof Error) setErrorMessage(err.message);

    //   console.log('Error: ', err)
    // }
  }
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleRegister = async () => {
    // if button enabled with JS hack

    try {
        const response = await axios.post('/register',
            JSON.stringify({ user:'JHHL', pwd:'12345' }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        // TODO: remove console.logs before deployment
        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response))

    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 409) {
          console.log('Username Taken');
        } else {
          console.log('Registration Failed')
        }
    }
}

const handleSubmitDemo = async () => {

  try {
      const user = 'JHHL';
      const pwd = '12345';

      const response = await axios.post('/auth',
          JSON.stringify({ user, pwd }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      // navigate(from, { replace: true });
  } catch (err) {
      if (!err?.response) {
          console.log('No Server Response');
      } else if (err.response?.status === 400) {
          console.log('Missing Username or Password');
      } else if (err.response?.status === 401) {
          console.log('Unauthorized');
      } else {
          console.log('Login Failed');
      }
  }
}

  const  refresh  = useRefreshToken();



  const [selectedCity, setSelectedCity] = useState("");
  const [icon, setIcon] = useState("mail");
  const [description, setDescription] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [postId, setPostId] = useState("");
  const [info, setInfo] = useState();

  const {login, error, isLoading} = useLogin();


  const handleForm = async () => {

    await login({email: info.email, password: info.password});
    // if (info.email.toLowerCase() !== info.emailCheck.toLowerCase()){
    //   console.log('Los emails no concuerdan!', info.email, info.emailCheck);
    // }
    // console.log('Vamos a enviar:', info);
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({...info})
    // };
    // fetch('http://192.168.2.7:3000/users/signup', requestOptions)
    //   .then(response => response.json())
    //   // .then(data => setCompleted(true));

    // // console.log('Esto es lo que voy a mandar:', info);
    // console.log('se registro el post:', postId);
  }

  const handleType1Change = (e) => {
    setType1(e.target.value);
  }


  const handleType2Change = (e) => {
    setType2(e.target.value);
  }

  const handleIconChange = (e) => {
    setIcon(e.target.value);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = () => {
    const info = {
      type: type1 ? "SE NECESITA...." : "SE NECESITA QUIEN...",
      location: selectedCity,
      title: type1 ? type1 : type2,
      description,
      owner: 'web',
      icon
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
  };
  fetch('http://192.168.2.7:3000/posts', requestOptions)
      .then(response => response.json())
      .then(data => setPostId(data._id));

    console.log('Esto es lo que voy a mandar:', info);
    console.log('se registro el post:', postId);

  }

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

      <Form title='Iniciar Sesion'>
        <InputField label={"Correo Electronico"} onChange={ e => {setInfo({...info, email: e.target.value})}}/>
        <InputPassword label={"Clave"} type={showPassword ? "text": "password"}
            onChange={ e => {setInfo({...info, password: e.target.value})}}/>
              {errorMessage && ( <ErrorLabel label={errorMessage} /> )}
        <Button title="Ingresar" type='button' onClick={()=>{onSubmit(info)}}/>
      </Form>
      <div>No tienes usuario? <a href={"/register2"}>Registrate</a></div>

      <br />
     </div>
    </>
  );
  
}

export default Login;
