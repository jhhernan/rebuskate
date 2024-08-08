import styled from 'styled-components';
import css from 'styled-components'
import mail from './img/mail.png';

export const Title = styled.div`
    // font-size: 50px;
    font-size: 11vw;
    // color: red;
    color: black;
    text-decoration: underline;
    text-decoration-color: black;
    margin-top: 20px;
`;

export const Title2 = styled.div`
    font-size: 50px;
    color: red;
    text-decoration: underline;
    text-decoration-color: black;
`;

export const SubtitleDecoration = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconCarouselContainer = styled.div`
  width: 100%;
  height: 120px;
  overflow-x: auto;
  white-space: nowrap;
  // background-color: #f2f2f2;
  display: flex;
`;

export const IconCarouselContent = styled.div`
  flex: 0 0 auto;
  margin-right: 30px;
  margin-left: 30px;
  padding: 10px;
  // padding-right: 10px;
  // background-color: #ddd;
  // border-radius: 8px;
  position: relative;
`;

// export const IconImage = styled.div`

// width: 20px;
// height: 20px;
// border: 1px solid red;
// position: relative;
// // display: block;
// // width: 50px; /* Adjust the width of your icons */
// // height: 50px; /* Adjust the height of your icons */
// // background-color: #3498db;
// // color: #fff;
// // text-align: center;
// // line-height: 50px;
// // font-size: 20px;
// `;

export const IconImage = styled.span`
  position: absolute;
  // width: 42px;
  height: auto;
  // left: -20px;
  top: 25px;
  top: ${props => props.extended ? "82px" : "25px"};
  height: 65px;
  width: 65px;
  border-radius: 50%;
  border: 1px solid black;
  background: ${props => `white url(${props.src}) no-repeat center center`};
  background-size: 35px; 
  // background-image: url(${mail});
`; 

export const IconText = styled.div`
  position: absolute;
  bottom: -20px;
  width: 100%;
  font-size: 12px;
  color: #333;
`;

export const Subtitle = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;
  width: 180px;
  padding: 10px;
`;

export const Description = styled.div`
    text-align: left;
    text-justify: auto;
    // font-size: 24px;
    margin-left: 45px;
    margin-right: 45px;
    padding-top: 20px;
    padding-bottom: 30px;
    font-size: calc(10px + 2vmin);
    color: black;
    // border: 1px solid red;
`;

export const Tag = styled.div`
    text-align: left;
    text-justify: auto;
    // font-size: 24px;
    margin-left: 55px;
    margin-right: 45px;
    padding-top: 10px;
    // padding-bottom: 10px;
    font-size: calc(10px + 2vmin);
    color: black;
    // border: 1px solid red;
`;


export const ContactOption = styled.span`
    text-align: left;
    text-justify: auto;
    // font-size: 24px;
    // margin-left: 10px;
    // margin-right: 45px;
    padding-top: 10px;
    // padding-bottom: 10px;
    font-size: calc(10px + 2vmin);
    color: black;
    // border: 1px solid red;
`;


export const DescriptionBox = styled.div`
    text-align: left;
    text-justify: auto;
    // font-size: 24px;
    margin-left: 45px;   //Antes 45px
    margin-right: 45px;
    // padding-top: 20px;
    // padding-bottom: 30px;
    font-size: calc(10px + 2vmin);
    color: black;
    // border: 1px solid red;
`;

export const DescriptionInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px 12px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
  font-size: 18px;

`;


export const Button = styled.div`
    font-size: calc(10px + 2vmin);
    color: white;
    background-color: red;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 10px;
`;

export const PublishButton = styled.button`
    border: none;
    // background-color: #24a0ed;
    background-color: red;
    color: #fff;
    font-size: 0.9rem;
    // width: 100%;

    // Para hacer el boton mas pequeño respecto a los campos 
    margin-left: 25%;
    margin-right: 25%;

    padding: 0.8rem;
    cursor: pointer;
    transition: all 0.5s;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);

    &:hover {
        background-color: #707070;
    }
`

export const PreviewContainer = styled.div`  
    display: flex;
    justify-content: space-between;
    justify-content: flex-start;
    // width: calc(100% - 150px);
    width: 160px;
    position: absolute;
    right: 45px;
    // margin-left: 45px;
    // margin-right: 45px;
    // margin-bottom: 10px;
`;


export const ButtonContainer = styled.div`  
    display: flex;
    justify-content: space-between;
    width: calc(100% - 90px);
    margin-left: 45px;
    margin-right: 45px;
    margin-bottom: 10px;
`;

export const SelectorContainer = styled.div`  
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: calc(100% - 90px);
    margin-left: 45px;
    margin-right: 45px;
    margin-bottom: 10px;
`;

export const Icon = styled.img`
  width: 32px;
  height: auto;
  margin-right: 35px;
`;


export const FormContainer = styled.div`  
    border:1px solid blue;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: calc(100% - 90px);
    margin-left: 45px;
    margin-right: 45px;
//     margin-bottom: 10px;
// `;
export const Label = styled.article`
  // margin-right: 45px;
  font-size: 16px;
  font-weight: 700;
`;

export const Test = styled.input`
  // margin-right: 45px;
  font-size: 15px
  // width: calc(100% - 120px);
  width: 10%;
  
  `;

  export const Select = styled.select`

  -webkit-appearance: none
  width: 100%;
  padding: 1rem 1.2rem;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 1rem;
  // outline-color: transparent;

  // background-color: green; 
  // color: red;

  &:focus {
      border: 3px solid #1ca34d;
      border: 3px solid black;
  }

  `;
  export const Option = styled.option`

  -webkit-appearance: none;

  background-color: blue; 
  color: yellow;

  // width: 100%;
  // padding: 1rem 1.2rem;
  // border: 1px solid #dadce0;
  // border-radius: 4px;
  // font-size: 1rem;
  // outline-color: transparent;

  &:focus {
      border: 3px solid #1ca34d;
      border: 3px solid black;
  }
  `;


export const PostContainer = styled.div`
width: calc(100% - 90px);
height: ${props => props.extended ? "185px" : "85px"};
// min-height: 85px;
margin-left: 45px;
margin-right: 45px;
margin-bottom: 5px;
border: 1px solid black;
position: relative;

`;


export const PostIcon = styled.span`
  position: absolute;
  width: 32px;
  height: auto;
  left: -20px;
  top: 25px;
  top: ${props => props.extended ? "82px" : "25px"};
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid black;
  background: ${props => `white url(${props.src}) no-repeat center center`};
  background-size: 20px; 
  // background-image: url(${mail});
`; 


export const PostType = styled.article`
  position: absolute;
  left: 30px;
  top: 20px;
  font-size: 14px;
`;

export const PostTitle = styled.article`
  position: absolute;
  left: 30px;
  top: 40px;
  font-size: 14px;
`;



export const PostTime = styled.article`
  position: absolute;
  right: 10px;
  top: 4px;
  font-size: 10px;
`;

export const PostExtended = styled.article`
  // position: absolute;
  text-align: left;
  text-justify: auto;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 70px;
  font-size: 12px;
  visibility: ${props => props.isVisible ? "none" : "hidden"};
`;

export const PostLocation = styled.article`
  position: absolute;
  right: 10px;
  bottom: 4px;
  font-size: 10px;
`;

export const SelectContainer = styled.div`
  position: relative;
  margin: 0;
`;

export const SelectLabelButton = styled.button`
  padding: 0.3rem 0.5rem;
  min-width: 7rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  color: #111;
  align-items: center;
  justify-content: space-between;
  border: 1px solid slategrey;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 #ccc;
  transition: 0.3s ease;
  &:hover {
    background-color: #eee;
  }
`;

export const DropdownStyle = styled.div`
position: absolute;
top: 0;
left: 0;
max-height: 40vmax;
min-width: 10rem;
padding: 0.4rem;
display: flex;
flex-direction: column;
border-radius: 5px;
background: #fafafa;
border: 1.5px solid slategrey;
transition: max-height 0.2s ease;
overflow: scroll;

visibility: ${props => props.isVisible ? "none" : "hidden"};
`;

export const DropdownItem = styled.div`
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
display: flex;
align-items: center;
width: 90%;
margin: 0.15rem 0;
padding: 0.3rem 0.5rem;
font-size: 0.9rem;
font-weight: 400;
color: #333;
border-radius: 0.3rem;
cursor: pointer;

color: ${props => props.active ? "#166edc" : "#333"};
font-weight: ${props => props.active ? "500" : "400"};


&:hover, :focus, :focus:hover {
  background-color: #166edc;
  color: #fafafa;
  outline: none;
}
`;

