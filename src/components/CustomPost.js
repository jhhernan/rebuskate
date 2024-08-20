import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styled';
import AlertDialog from './AlertDialog';
import IconButton from "@mui/material/IconButton";
import DeleteForever from '@mui/icons-material/DeleteForever';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';


const CustomPost = ({ title, description, type, time, location, post, _id })  => {


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
      const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + '/posts/interest', requestOptions);
      const result = await response.json();
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

  return (
    <S.PostContainer extended={extended} onClick={() => { setExtended(!extended) }}>
      <S.PostTime>{time}</S.PostTime>
      <S.PostType>{type}</S.PostType>
      <S.PostTitle isVisible={!extended}>{description}</S.PostTitle>
      <S.PostExtended isVisible={extended}>{description ? description : "lorasa sdasdasdasd asda d asd asd asdasdasdsad asd asd asdas das da d asd asd asdasdasdasd sda sdasdasd sadasd asdasdasdas asssda s faf faefe f afasfa fasf asfa sfa sfasf asfafa"}
        <S.NotificationChooser isVisible={extended}>
          <div style={{ "display": "flex", "justify-content": "center" }}>
            <button style={{ "color": "white", "background-color": "red", "width": "120px", "border": '0' }} onClick={handleNotifyClick}>{post.interested.length + " Interesados"}</button>
            {/* <S.NotifyButton onClick={handleNotifyClick}>ME INTERESA</S.NotifyButton> */}
          </div>
          <br />
          {showOptions && post.interested.map((interested, idx) => (
            <div id={idx}>{interested.user.name + " " + interested.user.email}</div>
          ))

          }

      </S.NotificationChooser>
      </S.PostExtended>
      {/* <S.PostLocation>{location}</S.PostLocation> */}
      {extended && (<S.PostLocation>
        {/* <IconButton onClick={handleDelete}>
          <DeleteForever />
        </IconButton> */}
        <AlertDialog
          title={"Borrar post"}
          description={"Estas seguro que quieres borrar tu publicacion?"}
          acceptAction={handleDelete}
          component={<DeleteForever/>}
        />
      </S.PostLocation>)}
    </S.PostContainer>
  );
}

export default CustomPost;
