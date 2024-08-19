import { useState } from 'react';
import * as S from '../styled';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';


const CustomPost = ({ title, description, type, time, location, post, _id })  => {


  const authHeader = useAuthHeader();

  const [extended, setExtended] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const { notifyWhatsapp, notifyApp, notifyCall } = post;


  const handleNotifyClick = (event) => {
    event.stopPropagation();
    console.log('Presionado boton')
    setShowOptions(!showOptions);
  };

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

  console.log('Solo probando:', post.interested);

  return (
    <S.PostContainer extended={extended} onClick={()=>{setExtended(!extended)}}>
      <S.PostTime>{time}</S.PostTime>
      <S.PostType>{type}</S.PostType>
      <S.PostTitle isVisible={!extended}>{description}</S.PostTitle>
      <S.PostExtended isVisible={extended}>{description ? description : "lorasa sdasdasdasd asda d asd asd asdasdasdsad asd asd asdas das da d asd asd asdasdasdasd sda sdasdasd sadasd asdasdasdas asssda s faf faefe f afasfa fasf asfa sfa sfasf asfafa"} 
      <S.NotificationChooser isVisible={extended}>
        <div style={{"display":"flex", "justify-content": "center"}}>
          <button style={{ "color": "white", "background-color": "red", "width":"120px", "border":'0'}} onClick={handleNotifyClick}>{post.interested.length + " Interesados"}</button>
          {/* <S.NotifyButton onClick={handleNotifyClick}>ME INTERESA</S.NotifyButton> */}
        </div>
        <br />
        {showOptions && post.interested.map((interested, idx) => (
            <div id={idx}>{interested.user.name + " " + interested.user.email}</div>
              // <CustomPost
              //   key={idx}
              //   post={post}
              //   icon={getComponentFromString(post.icon)}
              //   title={post.title}
              //   description={post.description}
              //   type={post.type}
              //   location={post.location}
              //   time={intlFormatDistance(new Date(post.createdAt), new Date(), { addSuffix: true, locale:'es' })}
              // />
            ))
        
        // (
        //         <div style={{ marginTop: '10px', "display":"flex", "flex-direction": "column", "align-items": "center" }}>
        //             {/* <div className="my-button" >
        //                 SMS
        //             </div> */}
        //             {notifyCall && (<S.NotifyButton><a href={"tel:"+notifyCall} style={{"text-decoration":"none", "color": "white" }}>LLAMAR</a></S.NotifyButton>)}
        //             {notifyWhatsapp && (<S.NotifyButton><a href={"https://wa.me/57"+notifyWhatsapp+"?text="+encodeURIComponent("Estoy interesado en la publicacion: " + description)} style={{"text-decoration":"none", "color": "white" }}>WHATSAPP</a></S.NotifyButton>)}
        //             {notifyApp && (<S.NotifyButton onClick={sendProfile} >ENVIAR PERFIL</S.NotifyButton>)}
        //             {/* <div className="my-button"  style={{ marginTop: '10px' }}>
        //                 Call
        //             </div>
        //             <div className="my-button"  style={{ marginTop: '10px' }}>
        //                 App Notification
        //             </div> */}
        //         </div>
                
        //     )
            
            }

{/* { post.interested.map((interested, idx) => (
            <div id={idx}>{interested.user.email}</div>
              // <CustomPost
              //   key={idx}
              //   post={post}
              //   icon={getComponentFromString(post.icon)}
              //   title={post.title}
              //   description={post.description}
              //   type={post.type}
              //   location={post.location}
              //   time={intlFormatDistance(new Date(post.createdAt), new Date(), { addSuffix: true, locale:'es' })}
              // />
            ))
            } */}
      </S.NotificationChooser>
      </S.PostExtended>
      <S.PostLocation>{location}</S.PostLocation>
    </S.PostContainer>
  );
}


export default CustomPost;
