import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './App.css';
import * as S from './styled';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Button from './components/Button';
import Form from './components/Form';
import ErrorLabel from './components/ErrorLabel';
import SuccessLabel from './components/SuccessLabel';
import InputField from './components/InputField';
import InputPassword from './components/InputPassword';


function LightRegister() {

  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const navigate = useNavigate();  // Initialize navigate

  const handleInfoChange = (field, value) => {
    if (error) {
      setError('');
    }
    setInfo({ ...info, [field]: value });
  }

  const handleForm = async (event) => {
    event.preventDefault();
    let didCompleteRegistration = false;

    if (!info.email || !info.emailCheck || !info.password || !info.passwordCheck) {
      setError('Completa todos los campos');
      return
    }
    if (info.email.toLowerCase() !== info.emailCheck.toLowerCase()){
      console.log('Los emails no concuerdan!', info.email, info.emailCheck);
      setError('Los emails no concuerdan');
      return
    }
    if (info.password !== info.passwordCheck){
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

    try {
      setIsSubmitting(true);
      const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + '/users/signup', requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo registrar el usuario');
      }

      console.log('Success:', data);
      didCompleteRegistration = true;
      setRegistrationComplete(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error('There was an error!', error.message);
      setError(error.message);
      setIsSubmitting(false);
    } finally {
      if (!didCompleteRegistration) {
        setIsSubmitting(false);
      }
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <S.AppShell>
          <S.TopBar>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <S.BrandMark>
                <S.BrandDot>R</S.BrandDot>
                <S.BrandName>rebuscate<span>.com</span></S.BrandName>
              </S.BrandMark>
            </Link>
          </S.TopBar>

          <S.Hero>
            <S.HeroKicker><AddCircleOutlineIcon fontSize="small" /> Publicar anuncio</S.HeroKicker>
            <S.HeroTitle>Crea tu cuenta.</S.HeroTitle>
            <S.HeroText>Regístrate para publicar oportunidades, recibir interesados y gestionar tus anuncios desde tu panel.</S.HeroText>
          </S.Hero>

          <S.SectionHeader>
            <S.SectionTitle>Datos de acceso</S.SectionTitle>
            <S.ResultCount>Cuenta para publicar</S.ResultCount>
          </S.SectionHeader>

          <S.AuthShell>
            <Form title='Regístrate'>
              <InputField label={"Correo electrónico"} onChange={e => { handleInfoChange('email', e.target.value) }} />
              <InputField label={"Confirmar correo electrónico"} onChange={e => { handleInfoChange('emailCheck', e.target.value) }} />
              <InputPassword label={"Clave"} onChange={e => { handleInfoChange('password', e.target.value) }} />
              <InputPassword label={"Confirmar Clave"} onChange={e => { handleInfoChange('passwordCheck', e.target.value) }} />
              {error && (<ErrorLabel label={error} />)}
              {registrationComplete && (<SuccessLabel label={"Cuenta creada exitosamente. Ya puedes iniciar sesión."} />)}
              <Button title={isSubmitting ? "Registrando..." : "Registrar"} type='button' disabled={isSubmitting || registrationComplete} onClick={handleForm} />
            </Form>

            <S.JobMeta><PersonAddIcon fontSize="small" /> Ya tienes usuario? <Link to="/login">Ingresa aquí</Link></S.JobMeta>
          </S.AuthShell>
        </S.AppShell>
      </header>
    </div>
  );

}

export default LightRegister;
