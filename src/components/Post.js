import { useState } from 'react';
import * as S from '../styled';
import GoLoginDialog from './GoLoginDialog';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Modal from './OnlyPreviewModal/Modal';
import ShareIcon from '@mui/icons-material/Share';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';




const Post = ({ title, description, type, time, location, post, icon, _id })  => {


  const authHeader = useAuthHeader();
  const authUser = useAuthUser();

  const [extended, setExtended] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [showModalNew, setShowModalNew] = useState(false);
  const openModalNew = () => setShowModalNew(true);
  const closeModalNew = () => setShowModalNew(false);


  const { notifyWhatsapp, notifyApp, notifyCall } = post;
  const imageList = post.imageList || [];
  const previewImages = imageList.slice(0, 3);
  const isNeededPost = (type || post.type || "").toUpperCase().includes("SE NECESITA");


  const handleShare = (event) => {
    event.stopPropagation();
    console.log('Presionado boton de Share')
    const postUrl = `${window.location.origin}/post/${post._id}`;
    const newUrl = "https://api.whatsapp.com/send/?text="+encodeURIComponent(`Creo que esta oportunidad puede interesarte: ${postUrl}`)
    // &"type=phone_number&app_absent=0";
    console.log('Vamos a:', newUrl);
    window.location = newUrl;

  };

  const handleNotifyClick = (event) => {
    event.stopPropagation();
    console.log('Presionado boton')
    setShowOptions(!showOptions);
  };

  const clickOnPreview = (event, imageIndex) => {
    event.stopPropagation();
    setSelectedImageIndex(imageIndex);
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
      <S.JobCardTop>
        <S.JobAvatar>
          {isNeededPost ? <CampaignOutlinedIcon fontSize="small" /> : icon ? <img src={icon} alt="" /> : <WorkOutlineIcon fontSize="small" />}
        </S.JobAvatar>
        <S.JobMain>
          <S.PostType>{type || "Trabajo disponible"}</S.PostType>
          <S.PostTitle isVisible={!extended}>{description}</S.PostTitle>
          <S.PostExtended isVisible={extended}>{description}</S.PostExtended>
          <S.JobMetaRow>
            <S.JobMeta><PlaceIcon fontSize="small" />{location || post.city || "Ubicación por confirmar"}</S.JobMeta>
            <S.JobMeta><AccessTimeIcon fontSize="small" />{time}</S.JobMeta>
          </S.JobMetaRow>
        </S.JobMain>
      </S.JobCardTop>

      <S.PreviewContainer2 isVisible={extended}>
        {imageList.length > 0 && (
          <S.PreviewGrid>
            {previewImages.map((image, idx) => (
              <S.PreviewTile key={`${image}-${idx}`} onClick={(e)=>clickOnPreview(e, idx)} aria-label={`Abrir imagen ${idx + 1}`}>
                <img src={image} alt="" />
                {idx === previewImages.length - 1 && imageList.length > previewImages.length && (
                  <S.PreviewMore>+{imageList.length - previewImages.length}</S.PreviewMore>
                )}
              </S.PreviewTile>
            ))}
          </S.PreviewGrid>
        )}
      </S.PreviewContainer2>

        <S.NotificationChooser isVisible={extended}>
          <S.JobActionRow>
            {!authUser && <GoLoginDialog
              title={"Inicia sesión"}
              description={"Debes iniciar sesion para proceder."}
              acceptAction={()=>{}}
              component={ <S.InterestButton>Me interesa</S.InterestButton> }
            />}
            {authUser && <S.InterestButton active={showOptions} onClick={handleNotifyClick}>Me interesa</S.InterestButton>}
            <S.IconCircleButton onClick={(e)=>{handleShare(e)}} aria-label="Compartir">
              <ShareIcon fontSize="small" />
            </S.IconCircleButton>
          </S.JobActionRow>
          {showOptions && (
            <S.ContactStack>
              {notifyCall && (<S.NotifyButton><a href={"tel:"+notifyCall}>Llamar</a></S.NotifyButton>)}
              {notifyWhatsapp && (<S.NotifyButton><a href={"https://wa.me/57"+notifyWhatsapp+"?text="+encodeURIComponent("Estoy interesado en la publicación: " + description)}>WhatsApp</a></S.NotifyButton>)}
              {notifyApp && (<S.NotifyButton onClick={sendProfile} >Enviar mi contacto</S.NotifyButton>)}
            </S.ContactStack>
          )}
        </S.NotificationChooser>
      {showModalNew && <Modal onClose={closeModalNew} images={imageList} initialIndex={selectedImageIndex} />}
    </S.PostContainer>
  );
}


export default Post;
