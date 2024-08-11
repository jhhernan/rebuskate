import { useState } from 'react';
import * as S from '../styled';

const Post = ({ title, description, type, time, location, post })  => {

  const [extended, setExtended] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const { notifyWhatsapp, notifyApp, notifyCall } = post;


  const handleNotifyClick = (event) => {
    event.stopPropagation();
    console.log('Presionado boton')
    setShowOptions(!showOptions);
};

  return (
    <S.PostContainer extended={extended} onClick={()=>{setExtended(!extended)}}>
      <S.PostTime>{time}</S.PostTime>
      <S.PostType>{type}</S.PostType>
      <S.PostTitle isVisible={!extended}>{description}</S.PostTitle>
      <S.PostExtended isVisible={extended}>{description ? description : "lorasa sdasdasdasd asda d asd asd asdasdasdsad asd asd asdas das da d asd asd asdasdasdasd sda sdasdasd sadasd asdasdasdas asssda s faf faefe f afasfa fasf asfa sfa sfasf asfafa"} 
      <S.NotificationChooser isVisible={extended}>
        <div style={{"display":"flex", "justify-content": "center"}}>
          <button style={{ "color": "white", "background-color": "red", "width":"120px", "border":'0'}} onClick={handleNotifyClick}>ME INTERESA</button>
          {/* <S.NotifyButton onClick={handleNotifyClick}>ME INTERESA</S.NotifyButton> */}
        </div>
        {showOptions && (
                <div style={{ marginTop: '10px', "display":"flex", "flex-direction": "column", "align-items": "center" }}>
                    {/* <div className="my-button" >
                        SMS
                    </div> */}
                    {notifyCall && (<S.NotifyButton><a href={"tel:"+notifyCall} style={{"text-decoration":"none", "color": "white" }}>LLAMAR</a></S.NotifyButton>)}
                    {notifyWhatsapp && (<S.NotifyButton><a href={"https://wa.me/57"+notifyWhatsapp+"?text="+encodeURIComponent("Estoy interesado en la publicacion: " + description)} style={{"text-decoration":"none", "color": "white" }}>WHATSAPP</a></S.NotifyButton>)}
                    {notifyApp && (<S.NotifyButton >ENVIAR PERFIL</S.NotifyButton>)}
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
      <S.PostLocation>{location}</S.PostLocation>
    </S.PostContainer>
  );
}


export default Post;
