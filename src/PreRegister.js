import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './App.css';
import * as S from './styled';


function Register() {

  const [selectedCity, setSelectedCity] = useState("");
  const [icon, setIcon] = useState("mail");
  const [description, setDescription] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [postId, setPostId] = useState("");
  const [info, setInfo] = useState();


  const navigate = useNavigate();  // Initialize navigate



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

        <div style={{ "font-size": "8vw", "padding-top": "30px", 'padding-bottom': '40px' }}>Registrate!!!</div>
        <div style={{ "background-color": "black", "color": "white", "width": '80%', "padding": "10px 20px", "display": "inline-flex", "align-items": "center", "justify-content": "center" }} onClick={() => navigate("/lightregister")}>QUIERO PUBLICAR ANUNCIO</div>
        <div style={{ "padding-top": "20px", 'padding-bottom': '20px', "font-size": "6vw" }}>Ó</div>
        <div style={{ "background-color": "red", "color": "white", "width": '80%', "padding": "10px 20px", "display": "inline-flex", "align-items": "center", "justify-content": "center" }} onClick={() => navigate("/registerexpert")}>QUIERO REBUSCARME</div>
        <div style={{ "padding-top": "40px", "font-size": "8vw" }} >Comienza ahora</div>
      </div>
    </>
  );

}

export default Register;
