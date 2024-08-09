import { useState } from 'react';
import * as S from '../styled';

const Post = ({ title, description, type, time, location })  => {

  const [extended, setExtended] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleNotifyClick = (event) => {
    event.stopPropagation();
    setShowOptions(!showOptions);
};

  return (
    <S.PostContainer extended={extended} onClick={()=>{setExtended(!extended)}}>
      <S.PostTime>{time}</S.PostTime>
      <S.PostType>{type}</S.PostType>
      <S.PostTitle>{title}</S.PostTitle>
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
                    <S.NotifyButton onClick={handleNotifyClick}>LLAMAR</S.NotifyButton>
                    <S.NotifyButton onClick={handleNotifyClick}>WHATSAPP</S.NotifyButton>
                    <S.NotifyButton onClick={handleNotifyClick}>E-MAIL</S.NotifyButton>
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
