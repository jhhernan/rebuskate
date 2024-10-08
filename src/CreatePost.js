import logo from './logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CitySelector from './CitySelector';
import ErrorLabel from './components/ErrorLabel';
import SuccessLabel from './components/SuccessLabel';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import './App.css';
import * as S from './styled';

import UploadWidget from './components/UploadWidget';
import Modal from './components/Modal';
import Menu from './components/Menu';
import ImageViewerModal from './components/ImageViewerModal';
import spinner from './img/spinner.gif';
import add from './img/add.png';

import Modal2 from './components/NewModal/Modal';





function Register() {

  const authHeader = useAuthHeader();

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [form, setForm] = useState();
  const [postId, setPostId] = useState("");
  const [notifyCall, setNotifyCall] = useState(false);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(false);
  const [notifyApp, setNotifyApp] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);


  const [imageToUpload, setImageToUpload] = useState();
  const [preview1, setPreview1] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  
  const navigate = useNavigate();  // Initialize navigate

  //Testing...
  const [showModalNew, setShowModalNew] = useState(false);
  const openModalNew = () => setShowModalNew(true);
  const closeModalNew = () => setShowModalNew(false);
  //Testing...

  const [showModal, setShowModal] = useState(false);


  const openModal = () => {
    setShowModal(prev => !prev);
  };

  const clickOnPreview = (image) => {
    console.log('La imagen seleccionada es:', image)
    setSelectedImage(image);
    // openModal();


    // <button onClick={openModalNew}>Open Modal</button>
    // {showModalNew && <Modal2 onClose={closeModalNew} />}

    openModalNew();

  }

  const deleteSelectedImage = () => {
    setImageList(prevArray => prevArray.filter(element => element !== selectedImage));
    // openModal(); 
    closeModalNew();
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleImageChange = async (e) => {
    // setImageToUpload(e.target.files[0]);
    console.log('Voy a intentar subir:', imageToUpload, e.target.files[0])
    const image = new FormData()
    image.append('file', e.target.files[0]);
    image.append('cloud_name', 'jhhernan01');
    image.append('upload_preset', 'rebuskate');


    try{
      
      setImageLoading(true);
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/jhhernan01/image/upload',
      {
        method: 'POST',
        body: image
      }
    )
    const imgData = await response.json()
    let imageUrl = imgData.url.toString();
    setPreview1(imageUrl)
    console.log('Final: ', imageUrl);
    setImageList(oldArray => [...oldArray, imageUrl] );
    console.log('Array:', imageList);
    setImageLoading(false);


  }catch (err){
    console.log('El error', err)
    setImageLoading(false);
  }

  }

  const handleSubmit = async() => {
    setError(null);
    //Validaciones
    if (!selectedCity || !selectedDepartment){
      setError('Favor escoger ciudad y departamento!');
      return;
    }
    if (!description || description.length<20){
      setError('Favor realizar descripcion del servicio requerido.');
      return;
    }
    if (!notifyWhatsapp && !notifyCall && !notifyApp){
      setError('Favor escoger al menos una opcion de contacto');
      return;
    }

    console.log('Form:', form)
    const info = {
      location: selectedCity,
      description,
      // owner: 'web',
      notifyWhatsapp: notifyWhatsapp ? form.whatsapp : null,
      notifyCall: notifyCall ? form.phone : null,
      notifyApp,
      imageList,
      city: selectedCity,
      department: selectedDepartment,
      type: "SE NECESITA....",
      // title: 'Texto de prueba para el titulo.',
      // icon: "service_icon"

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
  // try {
  //   const doPost = await fetch(process.env.REACT_APP_BACKEND_SERVER + '/posts', requestOptions);
  //   const resultPost = await doPost.json();
  //   console.log('Se creo el post:', resultPost._id);

  // }catch (err){
  //   console.log('El error', err.message)
  // }

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + '/posts', requestOptions);
      const result = await response.json();
      setPostId(result._id);  // Update with fetched data
      console.log('result', result._id);
      setTimeout(() => {
        navigate('/');  // Assuming '/' is your main page
      }, 5000);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setCreating(false);  // End loading
    }

  // fetch(process.env.REACT_APP_BACKEND_SERVER + '/posts', requestOptions)

  //     .then(response => {
  //       if(response.status!==200)
  //         {
  //            throw new Error(response.message)
  //         }  
  //       response.json()
  //     })
  //     .then(data => setPostId(data._id))
  //     .catch((err) => {
  //       console.log('Error has ocurred');
  //       setError("No se ha podido crear la publicacion");
  //      })
  //      .finally(()=>{
  //       setCreating(false);
  //      })


  //   console.log('Esto es lo que voy a mandar:', info);
  //   console.log('se registro el post:', postId);
  setCreating(false);

  }

  return (
    <div className="App">
      <header className="App-header">
        <S.Menu>
          <Menu />
        </S.Menu>
        <Link to="/">
          {/* <S.Title>REBUSCATE.com</S.Title> */}
          <S.Title>rebuscate<span style={{ "color": "black" }}>.com</span></S.Title>
        </Link>
        <S.SubtitleDecoration>
          {/* <S.Subtitle  onClick={openModal}>CREAR ANUNCIO</S.Subtitle> */}
          <S.Subtitle>CREAR ANUNCIO</S.Subtitle>
        </S.SubtitleDecoration>
       
        <S.Tag>Ubicacion:</S.Tag>
        <CitySelector selectCity={setSelectedCity} selectDepartment={setSelectedDepartment}/>

        <S.Tag>Escribe lo que necesitas:</S.Tag>

        <br/>
         <ImageViewerModal showModal={showModal} setShowModal={setShowModal} url={selectedImage} remover={deleteSelectedImage}/>
        <S.DescriptionBox>
          <S.DescriptionInput placeholder={"Necesito..."} value={description} onChange={ e => {setDescription(e.target.value)}}></S.DescriptionInput>
          {/* <label for="files" class="btn">Agregar Foto</label> */}
        {/* <input type="file" id="files" accept="image/png, image/jpeg" name="image" onChange={handleImageChange} style={{"visibility":"hidden"}}></input> */}
         {/* {preview1 &&  (<img src={preview1} alt="Girl in a jacket" width="40" height="40" />)}  */}
         


         <S.PreviewContainer>
            {imageList.length > 0 && (
              <div>
                {imageList.map((image, idx) => (
                  <img src={image} alt="alt text" width="40" height="40" style={{ "margin-left": "10px" }} onClick={()=>clickOnPreview(image)} />
                ))}
              </div>
            )}
            {imageList.length < 3 && (
              <>
                {imageLoading ?
                  <img style={{ "width": "40px" }} src={spinner} alt="loading..." />
                  :

                  <div style={{ "width": "40px", "height": "40px", "margin-left": "10px" }}>
                    <label for="files" class="btn">

                    <img for="files" style={{"width":"40px"}} src={add} alt="add image"/>
                    </label>
                    <input type="file" id="files" accept="image/png, image/jpeg" name="image" onChange={handleImageChange} style={{ "visibility": "hidden", "width": "40px", "height": "40px" }}></input>
                  </div>
                }
              </>

            )}
          {/* <div style={{"width":"40px", "height":"40px",'border':"1px solid black"}}>+</div> */}
          {/* <div style={{"width":"40px", "height":"40px",'border':"1px solid black"}}>+</div> */}
         </S.PreviewContainer>
         {/* {imageList.length > 0 && (
            <div>
              {imageList.map((image, idx) => (
                <img src={image} alt="alt text" width="40" height="40" />  
              ))}
            </div>

         )} */}
         
        </S.DescriptionBox>

        <br/>
        <br/>
        <S.Tag>Medio de contacto:</S.Tag>

        <div style={{ "padding-left": "5px" }}>
          <S.Tag>
            <input type="checkbox" checked={notifyApp} onChange={()=>{setNotifyApp(!notifyApp)}}/>
            Recibir contacto de interesado
          </S.Tag>
          <S.Tag>
            <input type="checkbox" checked={notifyCall} onChange={()=>{setNotifyCall(!notifyCall)}}/>
            <S.ContactOption>Llamar al telefono:</S.ContactOption>
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
        {/* <UploadWidget /> */}

        {/* <button onClick={openModal} >I'm a modal</button> */}
        {/* <button >I'm a modal</button> */}
        {/* <div>Esto es una prueba</div>  */}
        {/* <img style={{"width": "40px"}} src={spinner} alt="loading..." /> */}
        {/* <Modal showModal={showModal} setShowModal={setShowModal} /> */}
        {/* <ImageViewerModal showModal={showModal} setShowModal={setShowModal} url={selectedImage} remover={deleteSelectedImage}/> */}

         {/* Testing */}
        {showModalNew && <Modal2 onClose={closeModalNew} imgUrl={selectedImage} remover={deleteSelectedImage} />}
         {/* Testing */}

         {error && ( <ErrorLabel label={error} /> )}
         {postId && ( <SuccessLabel label={"La publicacion ha sido creada exitosamente!"} /> )}
        <br/>
        {!creating ? (<S.PublishButton isVisible={!postId} onClick={()=>{handleSubmit()}}>Publicar</S.PublishButton>) : 
        <img style={{ "width": "40px", "align-self": "center", "padding-top": "10px" }} src={spinner} alt="loading..." />}
        {/* <S.PublishButton onClick={()=>{handleSubmit()}}>Publicar</S.PublishButton> */}
        {/* <button onClick={()=>{handleSubmit()}} style={{"font-size":"18px"}}>Ingresar</button> */}
        
	{/* <h1>Seccion de Registro</h1>
	<br/>
	<h2>En Construccion</h2> */}

  <br/>
  <br/>
  


      </header>
    </div>
  );
}

export default Register;
