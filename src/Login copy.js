import logo from './logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from './hooks/useLogin';
import CitySelector from './CitySelector';
import './App.css';
import * as S from './styled';

import Button from './components/Button';
import Form from './components/Form';
import InputField from './components/InputField';


function Login() {

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
    {/* <div className="App">
      <header className="App-header">
        <Link to="/">
          <S.Title>REBUSKATE.com</S.Title>
        </Link>

      </header>
    </div> */}

    <div style={{  "display": "flex",
    // "flex-direction": "column", 
      "border": "1px solid red",
      "justify-content": "center",
      "align-items": "center",
      "padding": "1rem",
      "height": "100vh"
      }}>

      {error &&  <div>{error}</div> }
      <Form>
        <InputField label={"Correo Electronico"} onChange={ e => {setInfo({...info, email: e.target.value})}}/>
        <InputField label={"Clave"} type='password' onChange={ e => {setInfo({...info, password: e.target.value})}}/>
        <Button title="Ingresar" type='button' onClick={handleForm}/>

      </Form>
     </div>

    <div className="App">
      <header className="App-header">
        <Link to="/">
          <S.Title>REBUSKATE.com</S.Title>
        </Link>


      </header>
    </div>

    </>
  );
  
}

export default Login;
