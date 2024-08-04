import logo from './logo.svg';
import { useState, useEffect} from 'react';
import { useSignup } from './hooks/useSignup';
import { Link } from 'react-router-dom';
import CitySelector from './CitySelector';
import './App.css';
import * as S from './styled';

import Button from './components/Button';
import Form from './components/Form';
import InputField from './components/InputField';


function Register() {

  const { signup, isLoading, error } = useSignup();

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
    fetch('/users/signup', requestOptions)
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

    console.log('Esto es lo que voy a mandar:', info);
    console.log('se registro el post:', postId);

  }

  return ( 

    completed ? 
    <div> Se ha registrado correctamente </div>
    :(

    <div style={{  "display": "flex",
    // "flex-direction": "column", 
      "justify-content": "center",
      "align-items": "center",
      "padding": "1rem",
      "height": "100vh"}}>
                {/* <S.Title2>REBUSKATE.com</S.Title2> */}
      <Form>
        <InputField label={"Nombres"} onChange={ e => {setInfo({...info, name: e.target.value})}} />
        <InputField label={"Apellidos"} onChange={ e => {setInfo({...info, lastName: e.target.value})}}/>
        <InputField label={"Cedula"} onChange={ e => {setInfo({...info, docNumber: e.target.value})}}/>
        <InputField label={"Celular"} type='numeric' onChange={ e => {setInfo({...info, phone: e.target.value})}}/>
        <InputField label={"Correo electronico"} onChange={ e => {setInfo({...info, email: e.target.value})}}/>

        <InputField label={"Clave"} type='password' onChange={ e => {setInfo({...info, password: e.target.value})}}/>
        <InputField label={"Confirmar clave:"} type='password' onChange={ e => {setInfo({...info, passwd2: e.target.value})}}/>


        {/* <S.Select style={{ "-webkit-appearance": "none" }}>
            <S.Option value="mail" style={{ "-webkit-appearance": "none" }}>Tipo de Documento</S.Option>
            <S.Option value="mail" style={{ "-webkit-appearance": "none" }}>mail</S.Option>
            <S.Option value="service_icon" style={{ "-webkit-appearance": "none" }}>service_icon</S.Option>
            <S.Option value="drill_icon" style={{ "-webkit-appearance": "none" }}>drill_icon</S.Option>
        </S.Select>  */}

        <Button title="Registrar" type='button' onClick={handleForm}/>
      </Form>
     </div>

    )

  // //   <div className="App">
  // //     <header className="App-header">
  // //       <Link to="/">
  // //         <S.Title>REBUSKATE.com</S.Title>
  // //       </Link>
  // //       <S.FormContainer>
  // //         <S.Label>Nombres:</S.Label>
  // //         <S.Test name='type1' value={""}  style={{"font-size":"18px"}} />

  // //         <S.Label>Apellidos:</S.Label>
  // //         <S.Test name='type1' value={""}  style={{"font-size":"18px"}} />

  // //         <S.Label>Tipo de documento:</S.Label>
  // //         <select style={{ "padding": "10px 10px 10px 10px", "border-radius": "0", "-webkit-appearance": "none" }}
  // //            value={icon}>
  // //           <option value="mail">Cedula de ciudadania</option>
  // //           <option value="service_icon">Cedula de Extranjeria</option>
  // //         </select>

  // //         <S.Label>Numero de documento:</S.Label>
  // //         <S.Test name='type1' value={""}  style={{"font-size":"18px"}} />

  // //         <S.Label>Telefono:</S.Label>
  // //         <S.Test name='type1' value={""}  style={{"font-size":"18px"}} />

  // //         <S.Label>Correo electronico:</S.Label>
  // //         <S.Test name='type1' value={""}  style={{"font-size":"18px"}} />
  // //         <br/>
  // //         <input name='type1' value={"Test"}  style={{"font-size":"18px", "width": "130px"}} />


  // //       </S.FormContainer>


  // //       <S.Label>Correo electronico:</S.Label>
  // //         <S.Test name='type1' value={""}  style={{"font-size":"18px"}} />


  // //       <br/>
  // //       <button onClick={()=>{handleSubmit()}} style={{"font-size":"18px"}}>Ingresar</button>
        


  // // <br/>
  // // <br/>
  

  // // <div>Test:{selectedCity}</div>
  // // <div>Test2:{postId}</div>
  // //     </header>
  // //     <div>Prueba</div>
  // //     <S.Test value={"123"}></S.Test>
  // //   </div>
  );
}

export default Register;
