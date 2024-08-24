import React from 'react';
import './Modal.css';

const Modal = ({ onClose, imgUrl, remover}) => {
  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* <img src="https://via.placeholder.com/300" alt="Placeholder" className="modal-image" /> */}
        {/* <img src="https://res.cloudinary.com/jhhernan01/image/upload/v1721950446/rebuskate/dxjjacrnuw7qoie3kigf.png" alt="Placeholder" className="modal-image" /> */}
        <img src={imgUrl} alt="image" className="modal-image" />
        {/* <div className="modal-buttons">
          <button className="btn" onClick={remover}>Eliminar Imagen</button>
        </div> */}
        <button className="close-btn" onClick={handleClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;