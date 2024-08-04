// import logo from './logo.svg';
import { useState } from 'react';
// import './App.css';
import * as S from '../styled';
import mail from '../img/mail.png';


const Post = ({ icon, title, description, type, time, location })  => {

  const [currentValue, setCurrentValue] = useState('');
  const [open, setOpen] = useState(false);
  const [extended, setExtended] = useState(false);

  const handleOpen = () => {
    console.log('En el handleOpen');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (value) => {
    setCurrentValue(value);
  };
  const handleChange = (value) => {
    handleValueChange(value);
    // call method, if it exists
    // if (onChange) onChange(value);
    // close, after all tasks are finished
    handleClose();
  };
  return (
    <S.PostContainer extended={extended} onClick={()=>{setExtended(!extended)}}>
      {/* <S.PostIcon extended={extended} src={icon}></S.PostIcon> */}
      <S.PostTime>{time}</S.PostTime>
      <S.PostType>{type}</S.PostType>
      <S.PostTitle>{title}</S.PostTitle>
      <S.PostExtended isVisible={extended}>{description ? description : "lorasa sdasdasdasd asda d asd asd asdasdasdsad asd asd asdas das da d asd asd asdasdasdasd sda sdasdasd sadasd asdasdasdas asssda s faf faefe f afasfa fasf asfa sfa sfasf asfafa"} </S.PostExtended>
      <S.PostLocation>{location}</S.PostLocation>
    </S.PostContainer>
  );
}


export default Post;
