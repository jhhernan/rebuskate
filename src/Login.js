import logo from './logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from './hooks/useLogin';
import CitySelector from './CitySelector';
import './App.css';
import * as S from './styled';

import Button from './components/Button';
import Form from './components/Form';
import ErrorLabel from './components/ErrorLabel';
import InputField from './components/InputField';

import useRefreshToken from './hooks/useRefreshToken';

import axios from './api/axios';
import useAuth from './hooks/useAuth';

function Login() {

  const { setAuth } = useAuth();

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
      type: type1 ? "SE NECESITA..." : "SE NECESITA QUIEN...",
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
        <InputField label={"Clave"} type='password' onChange={ e => {setInfo({...info, password: e.target.value})}}/>
        {error && ( <ErrorLabel label={error} /> )}
        <Button title="Ingresar" type='button' onClick={handleForm}/>
      </Form>

      <br />
     </div>
    </>
  );
  
}

export default Login;
