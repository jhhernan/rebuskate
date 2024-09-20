import logo from './logo.svg';
import { useState } from 'react';
import { useSignup } from './hooks/useSignup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import CitySelector from './CitySelector';
import './App.css';
import * as S from './styled';

import Button from './components/Button';
import Form from './components/Form';
import LargeForm from './components/LargeForm';
import ErrorLabel from './components/ErrorLabel';
import InputField from './components/InputField';
import InputFieldSpaced from './components/InputFieldSpaced';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


function Register() {

  const [selectedCity, setSelectedCity] = useState("");
  const [icon, setIcon] = useState("mail");
  const [description, setDescription] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [postId, setPostId] = useState("");
  const [info, setInfo] = useState();
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");

  const { signup, isLoading, error } = useSignup();

  const navigate = useNavigate();  // Initialize navigate


  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setCity("");
    setInfo({...info, department: e.target.value})
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setInfo({...info, city: e.target.value})
  };

  const handleForm = async () => {
    // await signup(info);


    if (info.email.toLowerCase() !== info.emailCheck.toLowerCase()){
      console.log('Los emails no concuerdan!', info.email, info.emailCheck);
      return
    }
    console.log('Vamos a enviar:', info);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...info})
    };
    fetch(process.env.REACT_APP_BACKEND_SERVER + '/users/signup', requestOptions)
      .then(response => response.json())
      // .then(data => setCompleted(true));

    // console.log('Esto es lo que voy a mandar:', info);
    console.log('se registro el post:', postId);
    navigate("/login");

    // falta agregar manejo de errores OJO!!!!
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
    //  "justify-content": "center",
      "align-items": "center",
      "padding": "1rem",
      "height": "100vh"
      }}>

        
      <LargeForm>
        <InputField label={"Correo Electronico"} onChange={ e => {setInfo({...info, email: e.target.value})}}/>
        <InputField label={"Confirmar Correo electronico"} onChange={ e => {setInfo({...info, emailCheck: e.target.value})}}/>
        <InputField label={"Clave"} type="password" onChange={ e => {setInfo({...info, password: e.target.value})}}/>
        <InputField label={"Confirmar Clave"} type="password" onChange={ e => {setInfo({...info, passwordCheck: e.target.value})}}/>
        <div style={{"border": "1px solid #dadce0", "padding-top": "8px", "margin-top": "8px", "min-height":"520px"}}>
          <div style={{"padding": "8px", "display":"flex", "justify-content": "center"}}>TU INFORMACION</div>
          <InputFieldSpaced label={"Nombres"} onChange={ e => {setInfo({...info, name: e.target.value})}} />
          <InputFieldSpaced label={"Apellidos"} onChange={ e => {setInfo({...info, lastName: e.target.value})}}/>
          <div style={{"display":"flex", "justify-content": "center"}}>
          <PersonAddIcon sx={{ width: 70, height: 70 }} color="action" />
          </div>
          <InputFieldSpaced label={"Oficio"} onChange={ e => {setInfo({...info, occupation: e.target.value})}}/>

          <S.SelectorContainer2 style={{"margin-top":"10px"}}>
          <AddLocationIcon fontSize="large" color="action" />

          <select style={{ "background-color": "black", "color": "white",  "flex": "1", "padding": "10px 10px 10px 10px", "border-radius": "0", "-webkit-appearance": "none", "text-align": "center", "margin": "3px"}} 
            onChange={handleDepartmentChange} value={department}>
            <option value="">DEPARTAMENTO</option>
            <option value="Atlantico">Atlantico</option>
            <option value="Bolivar">Bolivar</option>
            <option value="Cordoba">Cordoba</option>
            <option value="Cesar">Cesar</option>
            <option value="Guajira">Guajira</option>
            <option value="Magdalena">Magdalena</option>
            <option value="Sucre">Sucre</option>
          </select>
          <select
            onChange={handleCityChange}
            value={city}
            // disabled={department === ""}
            style={{ "background-color": "black", "color": "white", "flex": "1", "padding": "10px 10px 10px 10px", "border-radius": "0", "-webkit-appearance": "none", "text-align": "center", "margin": "3px" }} >

            <option value="">CIUDAD/MCPIO</option>
            {department === "Atlantico" && (
              <><option key="Barranquilla">Barranquilla</option><option key="Ponedera">Ponedera</option><option key="Malambo">Malambo</option><option key="Soledad">Soledad</option></>
            )}
            {department === "Bolivar" && (
              <><option key="Cartagena">Cartagena</option><option key="Turbaco">Turbaco</option></>
            )}
            {department === "Cordoba" && (
              <><option key="Monteria">Monteria</option><option key="Montelibano">Montelibano</option></>
            )}
            {department === "Cesar" && (
              <><option key="La Paz">La Paz</option><option key="Valledupar">Valledupar</option></>
            )}
            {department === "Guajira" && (
              <><option key="Riohacha">Riohacha</option><option key="Palomino">Palomino</option></>
            )}
            {department === "Magdalena" && (
              <><option key="Rodadero">Rodadero</option><option key="Santa Marta">Santa Marta</option></>
            )}
            {department === "Sucre" && (
              <><option key="Corozal">Corozal</option><option key="Sincelejo">Sincelejo</option></>
            )}
          </select>
        </S.SelectorContainer2>
        <InputFieldSpaced label={"Telefono (llamadas)"} type='numeric' onChange={ e => {setInfo({...info, phone: e.target.value})}}/>
        <InputFieldSpaced label={"Whatsapp"} type='numeric' onChange={ e => {setInfo({...info, whatsapp: e.target.value})}}/>

        </div>
        {error && ( <ErrorLabel label={error} /> )}
        <br/>
        <br/>
        <Button title="Registrar" type='button' disabled={isLoading} onClick={handleForm}/>

      </LargeForm>
      <br />
      <div style={{"padding-bottom":"12px"}}>Ya tienes usuario? <a href={"/login"}>Ingresa aqui</a></div>
     </div>
    </>
  );
  
}

export default Register;
