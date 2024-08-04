import logo from './logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CitySelector from './CitySelector';
import './App.css';
import * as S from './styled';


function Register() {

  const [selectedCity, setSelectedCity] = useState("");
  const [icon, setIcon] = useState("mail");
  const [description, setDescription] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [postId, setPostId] = useState("");


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
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <S.Title>REBUSCATE.com</S.Title>
        </Link>
        <div>Ubicacion:</div>
        <CitySelector selectCity={setSelectedCity}/>
        <br/>
        <div>Se necesita un:
          <input name='type1' value={type1} onChange={handleType1Change} style={{"font-size":"18px"}}></input>
        </div>
        <br/>
        <div> Icono: 
          <select style={{ "padding": "10px 10px 10px 10px", "border-radius": "0", "-webkit-appearance": "none" }}
            onChange={handleIconChange} value={icon}>
            <option value="mail">mail</option>
            <option value="service_icon">service_icon</option>
            <option value="drill_icon">drill_icon</option>
          </select>
        </div>
        <div>Se necesita quien:
          <input name='type2' value={type2} onChange={handleType2Change} style={{"font-size":"18px"}}></input>
        </div>
        <br/>
        <div>Descripcion:
          <input name='type2' value={description} onChange={handleDescription} style={{"font-size":"18px"}}></input>
        </div>
        <br/>
        <button onClick={()=>{handleSubmit()}} style={{"font-size":"18px"}}>Ingresar</button>
        
	{/* <h1>Seccion de Registro</h1>
	<br/>
	<h2>En Construccion</h2> */}

  <br/>
  <br/>
  

  <div>Test:{selectedCity}</div>
  <div>Test2:{postId}</div>
      </header>
    </div>
  );
}

export default Register;
