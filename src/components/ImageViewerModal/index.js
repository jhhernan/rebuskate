import React, { useRef, useEffect, useCallback } from 'react';
// import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
// import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  width: 100%;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 100;
  border-radius: 10px;
`;
const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
//   justify-content: center;
//   align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const Image = styled.img`
  max-height:400px;
  max-width:400px;
  height:auto;
  width:auto;
}
`;


// const CloseModalButton = styled(MdClose)`
const CloseModalButton = styled.div`

  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const Modal = ({ showModal, setShowModal, url, remover}) => {
  const modalRef = useRef();

  // const animation = useSpring({
  //   config: {
  //     duration: 250
  //   },
  //   opacity: showModal ? 1 : 0,
  //   transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  // });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          {/* <animated.div style={animation}> */}
            <ModalWrapper showModal={showModal}>
              {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
              <ModalContent>
                {/* <h1>Are you ready?</h1>
                <p>Get exclusive access to our next launch.</p> */}
                {/* <img src={"http://https://res.cloudinary.com/jhhernan01/image/upload/v1721950446/rebuskate/dxjjacrnuw7qoie3kigf.png"} alt="Girl in a jacket"  width='80%'/> */}
                {/* <img src={url} width='30%' /> */}
                
                <Image src={url} />


                {/* <button>Join Now</button> */}
              </ModalContent>
              <ModalContent>
              <div>
                    <br />
                    <button onClick={() => setShowModal(prev => !prev)}>Ok!</button>
                    <button onClick={remover}>Borrar</button>
                </div>
              </ModalContent>
              {/* <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              /> */}
            </ModalWrapper>
          {/* </animated.div> */}
        </Background>
      ) : null}
    </>
  );
};

export default Modal;