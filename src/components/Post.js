import { useState } from 'react';
import * as S from '../styled';
import GoLoginDialog from './GoLoginDialog';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Modal from './OnlyPreviewModal/Modal';
import ShareIcon from '@mui/icons-material/Share';




const Post = ({ title, description, type, time, location, post, _id })  => {


  const authHeader = useAuthHeader();
  const authUser = useAuthUser();

  const [extended, setExtended] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showModalNew, setShowModalNew] = useState(false);
  const openModalNew = () => setShowModalNew(true);
  const closeModalNew = () => setShowModalNew(false);


  const { notifyWhatsapp, notifyApp, notifyCall } = post;


  const handleShare = (event) => {
    event.stopPropagation();
    console.log('Presionado boton de Share')
    const newUrl = "https://api.whatsapp.com/send/?text="+encodeURIComponent("Creo que esta oportunidad puede interesarte: ")+"https://mellifluous-belekoy-48bd91.netlify.app/post/"+post._id
    // &"type=phone_number&app_absent=0";
    console.log('Vamos a:', newUrl);
    window.location = newUrl;

  };

  const handleNotifyClick = (event) => {
    event.stopPropagation();
    console.log('Presionado boton')
    setShowOptions(!showOptions);
  };

  const clickOnPreview = (event,image) => {
    event.stopPropagation();
    console.log('La imagen seleccionada es:', image)
    setSelectedImage(image);
    openModalNew();
  }

  const sendProfile = async (event) => {
    event.stopPropagation();

    console.log('El usuario quiere aplicar al post:', post._id);

    const info = {
      postId: post._id
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(info)
    };
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + '/posts/interest', requestOptions);
      const result = await response.json();
      // console.log('result', result._id);
      // setTimeout(() => {
      //   navigate('/');  // Assuming '/' is your main page
      // }, 5000);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // setCreating(false);  // End loading
      console.log('Listo v1!');
    }
  }


  return (
    <S.PostContainer extended={extended} onClick={()=>{setExtended(!extended)}}>
      <S.PostTime>{time}</S.PostTime>
      <S.PostType>{type}</S.PostType>
      <S.PostTitle isVisible={!extended}>{description}</S.PostTitle>
      <S.PostExtended isVisible={extended}>{description ? description : "lorasa sdasdasdasd asda d asd asd asdasdasdsad asd asd asdas das da d asd asd asdasdasdasd sda sdasdasd sadasd asdasdasdas asssda s faf faefe f afasfa fasf asfa sfa sfasf asfafa"} 
      <S.PreviewContainer2 isVisible={extended}>
      {post.imageList.length > 0 && (
              <div>
                {post.imageList.map((image, idx) => (
                  <img src={image} alt="alt text" width="40" height="40" style={{ "margin-left": "10px" }} onClick={(e)=>clickOnPreview(e,image)} />
                ))}
              </div>
            )}
      </S.PreviewContainer2>
        <S.NotificationChooser isVisible={extended}>
          <div style={{ "display": "flex", "justify-content": "center" }}>
            {/* Un boton para que le salga la alerta en caso que el usuario no este loggeado */}
            {!authUser && <GoLoginDialog
              title={"Inicia Sesion"}
              description={"Debes iniciar sesion para proceder."}
              acceptAction={()=>{}}
              component={ <button style={{ "color": "white", "background-color": "black", "width":"130px", "border":'0'}} >ME INTERESA</button> }
            />}
          {authUser && <><button style={{"color": !showOptions ? "white" : "black", "background-color": !showOptions? "black" : "white", "width":"130px", "border": !showOptions ? '0' : "1px solid black"}} onClick={handleNotifyClick}>ME INTERESA</button>   <ShareIcon onClick={(e)=>{handleShare(e)}} style={{"position": "absolute", "left": "calc(50% + 70px)","margin-right": "2px"}} fontSize="small" color="action" /></>}
          {/* <S.NotifyButton onClick={handleNotifyClick}>ME INTERESA</S.NotifyButton> */}
        </div>
        {showOptions && (
                <div style={{ marginTop: '10px', "display":"flex", "flex-direction": "column", "align-items": "center" }}>
                    {/* <div className="my-button" >
                        SMS
                    </div> */}
                    {notifyCall && (<S.NotifyButton><a href={"tel:"+notifyCall} style={{"text-decoration":"none", "color": "white" }}>LLAMAR</a></S.NotifyButton>)}
                    {notifyWhatsapp && (<S.NotifyButton><a href={"https://wa.me/57"+notifyWhatsapp+"?text="+encodeURIComponent("Estoy interesado en la publicacion: " + description)} style={{"text-decoration":"none", "color": "white" }}>WHATSAPP</a></S.NotifyButton>)}
                    {notifyApp && (<S.NotifyButton onClick={sendProfile} >ENVIAR MI CONTACTO</S.NotifyButton>)}
                    {/* <div className="my-button"  style={{ marginTop: '10px' }}>
                        Call
                    </div>
                    <div className="my-button"  style={{ marginTop: '10px' }}>
                        App Notification
                    </div> */}
                </div>
            )}
      </S.NotificationChooser>
      </S.PostExtended>
      {showModalNew && <Modal onClose={closeModalNew} imgUrl={selectedImage} />}
      <S.PostLocation>{location}</S.PostLocation>
    </S.PostContainer>
  );
}


export default Post;
