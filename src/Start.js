import logo from './logo.svg';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import CitySelector from './CitySelector';
import './App.css';
import * as S from './styled';

import Button from './components/Button';
import Form from './components/Form';
import InputField from './components/InputField';
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  font-size: 2rem;
  padding: 1rem;
`;


function Register() {

  const [info, setInfo] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    docType: "",
    docNumber: ""
  })

  const [completed, setCompleted]=useState(false);


  const [selectedCity, setSelectedCity] = useState("");
  const [icon, setIcon] = useState("mail");
  const [description, setDescription] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [postId, setPostId] = useState("");

  const handleForm = () => {
    console.log('Vamos a enviar:', info);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...info})
    };
    fetch('http://192.168.2.7:3000/users/signup', requestOptions)
      .then(response => response.json())
      .then(data => setCompleted(true));

    // console.log('Esto es lo que voy a mandar:', info);
    console.log('se registro el post:', postId);
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
      .then(data => setCompleted(true));   //setPostId(data._id));



  }

  return ( 

    completed ? 
    <div> Se ha registrado correctamente </div>
    :(

    <div style={{  "display": "flex",
    "flex-direction": "column", 
      "justify-content": "center",
      "align-items": "center",
      "padding": "1rem",
      "height": "100vh"}}>
                <S.Title2>REBUSKATE.com</S.Title2>
      <Form showTitle={false}>
        <Title>Que quieres hacer hoy?</Title>

        {/* <InputField label={"Clave"} type='password' onChange={ e => {setInfo({...info, password: e.target.value})}}/> */}
        {/* <InputField label={"Confirmar clave:"} type='password' onChange={ e => {setInfo({...info, passwd2: e.target.value})}}/> */}

        <Link to="/">
          <Button title="Buscar trabajo" type='button'/>
        </Link>
        <Link to="/register2">
          <Button title="Registrarme y publicar" type='button'/>
        </Link>
      </Form>
     </div>

    )

  );
}

export default Register;
