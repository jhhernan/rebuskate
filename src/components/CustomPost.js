import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styled';
import AlertDialog from './AlertDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';


const CustomPost = ({ description, type, time, location, post })  => {


  const authHeader = useAuthHeader();

  const [extended, setExtended] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();  // Initialize navigate

  const handleNotifyClick = (event) => {
    event.stopPropagation();
    console.log('Presionado boton')
    setShowOptions(!showOptions);
  };

  const handleDelete = async () => {

    console.log('El usuario quiere borrar al post:', post._id);

    const info = {
      postId: post._id
    };

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(info)
    };
    try {
      await fetch(process.env.REACT_APP_BACKEND_SERVER + '/posts/interest', requestOptions);
      // console.log('result', result._id);
      // setTimeout(() => {
        navigate(0);  // Supuestamente con 0 es refresh...
      // }, 5000);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // setCreating(false);  // End loading
      console.log('Listo v1!');
    }
  }

  console.log('Solo probando:', post.interested);
  const interestedList = post.interested || [];

  return (
    <S.PostContainer extended={extended} onClick={() => { setExtended(!extended) }}>
      <S.JobCardTop>
        <S.JobAvatar><WorkOutlineIcon fontSize="small" /></S.JobAvatar>
        <S.JobMain>
          <S.PostType>{type || "Publicacion activa"}</S.PostType>
          <S.PostTitle isVisible={!extended}>{description}</S.PostTitle>
          <S.PostExtended isVisible={extended}>{description || "Sin descripción disponible."}</S.PostExtended>
          <S.JobMetaRow>
            <S.JobMeta><PlaceIcon fontSize="small" />{location || post.city || "Ubicación por confirmar"}</S.JobMeta>
            <S.JobMeta><AccessTimeIcon fontSize="small" />{time}</S.JobMeta>
            <S.JobMeta><PeopleIcon fontSize="small" />{interestedList.length} interesados</S.JobMeta>
          </S.JobMetaRow>
        </S.JobMain>
      </S.JobCardTop>

      <S.NotificationChooser isVisible={extended}>
        <S.JobActionRow>
          <S.InterestButton active={showOptions} onClick={handleNotifyClick}>
            Ver interesados
          </S.InterestButton>
          <AlertDialog
            title={"Borrar anuncio"}
            description={"¿Estás seguro que quieres borrar tu publicación?"}
            acceptAction={handleDelete}
            component={<DeleteForever />}
          />
        </S.JobActionRow>

        {showOptions && (
          <S.ContactStack>
            {interestedList.length === 0 && <S.JobMeta>Nadie ha enviado interés todavía</S.JobMeta>}
            {interestedList.map((interested, idx) => (
              <S.NotifyButton key={idx}>
                {interested.user.name + " " + interested.user.email}
              </S.NotifyButton>
            ))}
          </S.ContactStack>
        )}
      </S.NotificationChooser>
    </S.PostContainer>
  );
}

export default CustomPost;
