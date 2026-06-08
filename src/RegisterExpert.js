import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './App.css';
import * as S from './styled';

import Button from './components/Button';
import LargeForm from './components/LargeForm';
import ErrorLabel from './components/ErrorLabel';
import SuccessLabel from './components/SuccessLabel';
import InputField from './components/InputField';
import InputPassword from './components/InputPassword';
import InputFieldSpaced from './components/InputFieldSpaced';
import { departments, getCitiesForDepartment } from './locations';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddIcon from '@mui/icons-material/Add';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Modal from './components/OnlyPreviewModal/Modal';


function Register() {

  const [info, setInfo] = useState({});
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const navigate = useNavigate();  // Initialize navigate
  const maxProfileImages = 5;
  const maxKeywords = 10;

  const handleInfoChange = (field, value) => {
    if (error) {
      setError('');
    }
    setInfo({ ...info, [field]: value });
  }

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setCity("");
    handleInfoChange('department', e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    handleInfoChange('city', e.target.value);
  };

  const openImageModal = (event, imageIndex) => {
    event.preventDefault();
    setSelectedImageIndex(imageIndex);
    setShowImageModal(true);
  }

  const removeImage = (event, imageUrl) => {
    event.preventDefault();
    event.stopPropagation();
    setImageList((currentImages) => currentImages.filter((image) => image !== imageUrl));
  }

  const uploadProfileImage = async (file) => {
    const image = new FormData();
    image.append('file', file);
    image.append('cloud_name', 'jhhernan01');
    image.append('upload_preset', 'rebuskate');

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/jhhernan01/image/upload',
      {
        method: 'POST',
        body: image
      }
    );
    const imgData = await response.json();

    if (!response.ok) {
      throw new Error(imgData.error?.message || 'No se pudo subir la imagen');
    }

    return imgData.url.toString();
  }

  const handleImageChange = async (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    event.target.value = "";

    if (selectedFiles.length === 0) {
      return;
    }

    const availableSlots = maxProfileImages - imageList.length;
    const filesToUpload = selectedFiles.slice(0, availableSlots);

    if (filesToUpload.length === 0) {
      setError(`Puedes subir máximo ${maxProfileImages} fotos`);
      return;
    }

    try {
      setError('');
      setImageLoading(true);
      const uploadedImages = await Promise.all(filesToUpload.map(uploadProfileImage));
      setImageList((currentImages) => [...currentImages, ...uploadedImages].slice(0, maxProfileImages));
    } catch (error) {
      console.error('There was an error uploading images!', error.message);
      setError(error.message);
    } finally {
      setImageLoading(false);
    }
  }

  const addKeyword = () => {
    const nextKeyword = keywordInput.trim().toLowerCase();

    if (!nextKeyword) {
      return;
    }

    if (keywords.length >= maxKeywords) {
      setError(`Puedes agregar máximo ${maxKeywords} palabras clave`);
      return;
    }

    if (keywords.includes(nextKeyword)) {
      setKeywordInput("");
      return;
    }

    setError('');
    setKeywords((currentKeywords) => [...currentKeywords, nextKeyword]);
    setKeywordInput("");
  }

  const handleKeywordKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addKeyword();
    }
  }

  const removeKeyword = (keywordToRemove) => {
    setKeywords((currentKeywords) => currentKeywords.filter((keyword) => keyword !== keywordToRemove));
  }

  const cities = getCitiesForDepartment(department);

  const handleForm = async (event) => {
    event.preventDefault();
    let didCompleteRegistration = false;

    if (!info.email || !info.emailCheck || !info.password || !info.passwordCheck || !info.name || !info.lastName || !info.occupation || !info.department || !info.city) {
      setError('Completa todos los campos requeridos');
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
      body: JSON.stringify({...info, imageList, keywords})
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
            <S.HeroKicker><WorkOutlineIcon fontSize="small" /> Perfil de trabajador</S.HeroKicker>
            <S.HeroTitle>Rebuscate.</S.HeroTitle>
            <S.HeroText>Crea tu perfil para que puedan contactarte por tu oficio, ciudad y datos de contacto.</S.HeroText>
          </S.Hero>

          <S.SectionHeader>
            <S.SectionTitle>Datos de registro</S.SectionTitle>
            <S.ResultCount>Perfil laboral</S.ResultCount>
          </S.SectionHeader>

          <S.AuthShell>
            <LargeForm title='Regístrate'>
              <InputField label={"Correo electrónico"} onChange={e => { handleInfoChange('email', e.target.value) }} />
              <InputField label={"Confirmar correo electrónico"} onChange={e => { handleInfoChange('emailCheck', e.target.value) }} />
              <InputPassword label={"Clave"} onChange={e => { handleInfoChange('password', e.target.value) }} />
              <InputPassword label={"Confirmar Clave"} onChange={e => { handleInfoChange('passwordCheck', e.target.value) }} />

              <S.FormSection>
                <S.FormSectionTitle><PersonAddIcon fontSize="small" /> Tu información</S.FormSectionTitle>
                <InputFieldSpaced label={"Nombres"} onChange={e => { handleInfoChange('name', e.target.value) }} />
                <InputFieldSpaced label={"Apellidos"} onChange={e => { handleInfoChange('lastName', e.target.value) }} />
                <InputFieldSpaced label={"Oficio"} onChange={e => { handleInfoChange('occupation', e.target.value) }} />
              </S.FormSection>

              <S.FormSection>
                <S.FormSectionTitle><LocalOfferIcon fontSize="small" /> Palabras clave</S.FormSectionTitle>
                <S.PhotoHelperText>Ingresa palabras clave relacionadas con tu servicio u oficio. Así recibirás más oportunidades.</S.PhotoHelperText>
                <S.PhotoHelperText>Opcional - {keywords.length} de {maxKeywords} palabras</S.PhotoHelperText>
                <S.KeywordInputRow>
                  <S.KeywordInput
                    type="text"
                    placeholder="Ej: plomero"
                    value={keywordInput}
                    onChange={(event) => setKeywordInput(event.target.value)}
                    onKeyDown={handleKeywordKeyDown}
                    disabled={keywords.length >= maxKeywords}
                  />
                  <S.KeywordAddButton type="button" onClick={addKeyword} disabled={keywords.length >= maxKeywords || !keywordInput.trim()} aria-label="Agregar palabra clave">
                    <AddIcon fontSize="small" />
                  </S.KeywordAddButton>
                </S.KeywordInputRow>
                {keywords.length > 0 && (
                  <S.KeywordList>
                    {keywords.map((keyword) => (
                      <S.KeywordChip key={keyword}>
                        {keyword}
                        <button type="button" onClick={() => removeKeyword(keyword)} aria-label={`Eliminar ${keyword}`}>
                          &times;
                        </button>
                      </S.KeywordChip>
                    ))}
                  </S.KeywordList>
                )}
              </S.FormSection>

              <S.FormSection>
                <S.FormSectionTitle><AddPhotoAlternateIcon fontSize="small" /> Fotos de perfil</S.FormSectionTitle>
                <S.PhotoHelperText>Opcional - {imageList.length} de {maxProfileImages} fotos</S.PhotoHelperText>
                <S.PhotoUploadGrid>
                  {imageList.map((image, idx) => (
                    <S.ProfilePhotoTile key={`${image}-${idx}`} type="button" onClick={(event) => openImageModal(event, idx)} aria-label={`Ver foto ${idx + 1}`}>
                      <img src={image} alt="" />
                      <S.PhotoRemoveButton type="button" onClick={(event) => removeImage(event, image)} aria-label={`Eliminar foto ${idx + 1}`}>
                        &times;
                      </S.PhotoRemoveButton>
                    </S.ProfilePhotoTile>
                  ))}
                  {imageList.length < maxProfileImages && (
                    <S.PhotoUploadTile>
                      {imageLoading ? "Subiendo..." : <AddPhotoAlternateIcon fontSize="small" />}
                      <input type="file" accept="image/png, image/jpeg" multiple onChange={handleImageChange} disabled={imageLoading} />
                    </S.PhotoUploadTile>
                  )}
                </S.PhotoUploadGrid>
              </S.FormSection>

              <S.FormSection>
                <S.FormSectionTitle><AddLocationIcon fontSize="small" /> Ubicación</S.FormSectionTitle>
                <S.InlineSelectorContainer>
                  <select onChange={handleDepartmentChange} value={department}>
                    <option value="">Departamento</option>
                    {departments.map((departmentOption) => (
                      <option key={departmentOption} value={departmentOption}>{departmentOption}</option>
                    ))}
                  </select>
                  <select onChange={handleCityChange} value={city}>
                    <option value="">Ciudad/Mcpio.</option>
                    {cities.map((cityOption) => (
                      <option key={cityOption} value={cityOption}>{cityOption}</option>
                    ))}
                  </select>
                </S.InlineSelectorContainer>
              </S.FormSection>

              <S.FormSection>
                <S.FormSectionTitle>Contacto</S.FormSectionTitle>
                <InputFieldSpaced label={"Teléfono (llamadas)"} type='numeric' onChange={e => { handleInfoChange('phone', e.target.value) }} />
                <InputFieldSpaced label={"Whatsapp"} type='numeric' onChange={e => { handleInfoChange('whatsapp', e.target.value) }} />
              </S.FormSection>

              {error && ( <ErrorLabel label={error} /> )}
              {registrationComplete && ( <SuccessLabel label={"Cuenta creada exitosamente. Ya puedes iniciar sesión."} /> )}
              <Button title={isSubmitting ? "Registrando..." : "Registrar"} type='button' disabled={isSubmitting || imageLoading || registrationComplete} onClick={handleForm} />
            </LargeForm>

            <S.JobMeta><PersonAddIcon fontSize="small" /> Ya tienes usuario? <Link to="/login">Ingresa aquí</Link></S.JobMeta>
          </S.AuthShell>
        </S.AppShell>
      </header>
      {showImageModal && <Modal onClose={() => setShowImageModal(false)} images={imageList} initialIndex={selectedImageIndex} />}
    </div>
  );
  
}

export default Register;
