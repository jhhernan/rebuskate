import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CitySelector from './CitySelector';
import ErrorLabel from './components/ErrorLabel';
import SuccessLabel from './components/SuccessLabel';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import './App.css';
import * as S from './styled';

import Menu from './components/Menu';
import ImageViewerModal from './components/ImageViewerModal';
import spinner from './img/spinner.gif';
import add from './img/add.png';

import Modal2 from './components/NewModal/Modal';





function CreatePost() {

  const authHeader = useAuthHeader();

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [form, setForm] = useState({});
  const [postId, setPostId] = useState("");
  const [notifyCall, setNotifyCall] = useState(false);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(false);
  const [notifyApp, setNotifyApp] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);


  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const navigate = useNavigate();

  const [showModalNew, setShowModalNew] = useState(false);
  const openModalNew = () => setShowModalNew(true);
  const closeModalNew = () => setShowModalNew(false);

  const [showModal, setShowModal] = useState(false);

  const clickOnPreview = (image) => {
    setSelectedImage(image);
    openModalNew();

  }

  const deleteSelectedImage = () => {
    setImageList(prevArray => prevArray.filter(element => element !== selectedImage));
    closeModalNew();
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const image = new FormData()
    image.append('file', file);
    image.append('cloud_name', 'jhhernan01');
    image.append('upload_preset', 'rebuskate');

    try{
      setError(null);
      setImageLoading(true);
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/jhhernan01/image/upload',
        {
          method: 'POST',
          body: image
        }
      )
      const imgData = await response.json()

      if (!response.ok) {
        throw new Error(imgData.error?.message || 'No se pudo subir la imagen');
      }

      let imageUrl = imgData.url.toString();
      setImageList(oldArray => [...oldArray, imageUrl] );
    }catch (err){
      setError('No se pudo subir la imagen. Intenta nuevamente.');
    } finally {
      setImageLoading(false);
    }

  }

  const handleSubmit = async() => {
    setError(null);

    if (!selectedCity || !selectedDepartment){
      setError('Favor escoger ciudad y departamento!');
      return;
    }
    if (!description || description.length<20){
      setError('Favor realizar descripción del servicio requerido.');
      return;
    }
    if (!notifyWhatsapp && !notifyCall && !notifyApp){
      setError('Favor escoger al menos una opción de contacto');
      return;
    }
    if (notifyCall && !form.phone){
      setError('Favor ingresar un teléfono para llamadas');
      return;
    }
    if (notifyWhatsapp && !form.whatsapp){
      setError('Favor ingresar un número de WhatsApp');
      return;
    }

    const info = {
      location: selectedCity,
      description,
      notifyWhatsapp: notifyWhatsapp ? form.whatsapp : null,
      notifyCall: notifyCall ? form.phone : null,
      notifyApp,
      imageList,
      city: selectedCity,
      department: selectedDepartment,
      type: "SE NECESITA....",
    }
    setCreating(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
       },
      body: JSON.stringify(info)
    };

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + '/posts', requestOptions);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'No se pudo crear la publicación');
      }

      setPostId(result._id);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setError('No se pudo crear la publicación. Intenta nuevamente.');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <S.BrandHeader>
          <Link to="/">
            <S.BrandMark>
              <S.BrandDot>R</S.BrandDot>
              <S.BrandName>rebuscate<span>.com</span></S.BrandName>
            </S.BrandMark>
          </Link>
          <Menu />
        </S.BrandHeader>
        <S.SubtitleDecoration>
          <S.Subtitle>CREAR ANUNCIO</S.Subtitle>
        </S.SubtitleDecoration>
       
        <S.Tag>Ubicación:</S.Tag>
        <CitySelector selectCity={setSelectedCity} selectDepartment={setSelectedDepartment}/>

        <S.Tag>Escribe lo que necesitas:</S.Tag>

        <br/>
         <ImageViewerModal showModal={showModal} setShowModal={setShowModal} url={selectedImage} remover={deleteSelectedImage}/>
        <S.DescriptionBox>
          <S.DescriptionInput placeholder={"Se necesita..."} value={description} onChange={ e => {setDescription(e.target.value)}}></S.DescriptionInput>

         <S.PreviewContainer>
	            {imageList.length > 0 && (
	              <div>
	                {imageList.map((image, idx) => (
	                  <img key={`${image}-${idx}`} src={image} alt="" width="40" height="40" style={{ "margin-left": "10px" }} onClick={()=>clickOnPreview(image)} />
	                ))}
	              </div>
	            )}
            {imageList.length < 3 && (
              <>
                {imageLoading ?
                  <img style={{ "width": "40px" }} src={spinner} alt="loading..." />
                  :

	                  <div style={{ "width": "40px", "height": "40px", "margin-left": "10px" }}>
	                    <label htmlFor="files" className="btn">

	                    <img style={{"width":"40px"}} src={add} alt="Agregar"/>
	                    </label>
	                    <S.VisuallyHiddenFileInput type="file" id="files" accept="image/png, image/jpeg" name="image" onChange={handleImageChange} />
	                  </div>
                }
              </>

            )}
         </S.PreviewContainer>
         
        </S.DescriptionBox>

        <br/>
        <br/>
        <S.Tag>Medio de contacto:</S.Tag>

        <div style={{ "padding-left": "5px" }}>
          <S.Tag>
            <input type="checkbox" checked={notifyApp} onChange={()=>{setNotifyApp(!notifyApp)}}/>
            Recibir perfil del interesado
          </S.Tag>
          <S.Tag>
            <input type="checkbox" checked={notifyCall} onChange={()=>{setNotifyCall(!notifyCall)}}/>
            <S.ContactOption>Llamar al teléfono:</S.ContactOption>
            <br />
            <input type="number" id="phone" name="phone" pattern="[0-9]*" inputmode="numeric" onChange={(e)=>{setForm({...form, phone: e.target.value})}} style={{"width":"80px", 'margin-left':"25px"}} />
          </S.Tag>
          <S.Tag>
            <input type="checkbox" checked={notifyWhatsapp} onChange={()=>{setNotifyWhatsapp(!notifyWhatsapp)}}/>
            Escribir al WhatsApp:
            <br />
            <input type="number" id="whatsapp" name="whatsapp" inputmode="numeric"  onChange={(e)=>{setForm({...form, whatsapp: e.target.value})}} style={{"width":"80px", 'margin-left':"25px"}} />
            </S.Tag>
        </div>


        <br/>

        {showModalNew && <Modal2 onClose={closeModalNew} imgUrl={selectedImage} remover={deleteSelectedImage} />}

         {error && ( <ErrorLabel label={error} /> )}
         {postId && ( <SuccessLabel label={"La publicación ha sido creada exitosamente. Redirigiendo..."} /> )}
        <br/>
        {!creating ? (<S.PublishButton isVisible={!postId} onClick={()=>{handleSubmit()}}>Publicar</S.PublishButton>) : 
        <img style={{ "width": "40px", "align-self": "center", "padding-top": "10px" }} src={spinner} alt="loading..." />}

	  <br/>
  <br/>
  


      </header>
    </div>
  );
}

export default CreatePost;
