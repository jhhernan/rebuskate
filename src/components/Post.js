import { useState } from 'react';
import * as S from '../styled';

const Post = ({ title, description, type, time, location })  => {

  const [extended, setExtended] = useState(false);

  return (
    <S.PostContainer extended={extended} onClick={()=>{setExtended(!extended)}}>
      <S.PostTime>{time}</S.PostTime>
      <S.PostType>{type}</S.PostType>
      <S.PostTitle>{title}</S.PostTitle>
      <S.PostExtended isVisible={extended}>{description ? description : "lorasa sdasdasdasd asda d asd asd asdasdasdsad asd asd asdas das da d asd asd asdasdasdasd sda sdasdasd sadasd asdasdasdas asssda s faf faefe f afasfa fasf asfa sfa sfasf asfafa"} </S.PostExtended>
      <S.PostLocation>{location}</S.PostLocation>
    </S.PostContainer>
  );
}


export default Post;
