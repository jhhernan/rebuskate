import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './App.css';
import * as S from './styled';

import Button from './components/Button';
import Form from './components/Form';
import ErrorLabel from './components/ErrorLabel';
import InputField from './components/InputField';


function LightRegister() {

  const [info, setInfo] = useState();
  const [error, setError] = useState(false);  

  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    if (error){
      setError('');
    }
  }, [info])



  const handleForm = async () => {

    if (info.email.toLowerCase() !== info.emailCheck.toLowerCase()){
      console.log('Los emails no concuerdan!', info.email, info.emailCheck);
      setError('Los emails no concuerdan');
      return
    }
    if (info.password.toLowerCase() !== info.passwordCheck.toLowerCase()){
      console.log('Las claves no concuerdan!');
      setError('Las claves no concuerdan');
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


      fetch(process.env.REACT_APP_BACKEND_SERVER + '/users/signup', requestOptions)
      .then(response => {
        // Try to parse the body even if the status code is not 200-299
        return response.json().then(data => {
          if (!response.ok) {
            // If the response is not OK, throw an error including the body
            const error = new Error(`Error: ${response.status} ${response.statusText}`);
            error.data = data; // Attach the error body to the error object
            throw error;
          }
          return data; // If response is OK, return the parsed data
        });
      })
      .then(data => {
        // Handle successful response data here
        console.log('Success:', data);
        navigate("/login");
      })
      .catch(error => {
        // Handle both network errors and response errors here
        console.error('There was an error!', error.message);
        if (error.data) {
          console.error('Error body:', error.data); // Print the error body if available
          setError(error.data.error)
        }
      });
    

  }


  return (
    <>


      <div className="App">
        <header className="App-header1">
          <Link to="/">
            {/* <S.Title>REBUSCATE.com</S.Title> */}
            <S.Title>rebuscate<span style={{ "color": "black" }}>.com</span></S.Title>
          </Link>

        </header>
      </div>

      <div style={{
        "display": "flex",
        "flex-direction": "column",
        // "border": "1px solid red",
        //  "justify-content": "center",
        "align-items": "center",
        "padding": "1rem",
        "height": "100vh"
      }}>


        <Form>
          {/* <InputField label={"Nombres"} onChange={ e => {setInfo({...info, name: e.target.value})}} /> */}
          {/* <InputField label={"Apellidos"} onChange={ e => {setInfo({...info, lastName: e.target.value})}}/> */}
          {/* <InputField label={"Celular"} type='numeric' onChange={ e => {setInfo({...info, phone: e.target.value})}}/> */}
          <InputField label={"Correo Electronico"} onChange={e => { setInfo({ ...info, email: e.target.value }) }} />
          <InputField label={"Confirmar Correo electronico"} onChange={e => { setInfo({ ...info, emailCheck: e.target.value }) }} />
          <InputField label={"Clave"} type="password" onChange={e => { setInfo({ ...info, password: e.target.value }) }} />
          <InputField label={"Confirmar Clave"} type="password" onChange={e => { setInfo({ ...info, passwordCheck: e.target.value }) }} />
          {error && (<ErrorLabel label={error} />)}
          <br />
          <br />
          <Button title="Registrar" type='button' onClick={handleForm} />

        </Form>
        <br />
        <div>Ya tienes usuario? <a href={"/login"}>Ingresa aqui</a></div>
      </div>
    </>
  );

}

export default LightRegister;
