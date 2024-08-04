import React from 'react';
import './Modal.css';

const Modal = ({ onClose, imgUrl, remover}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* <img src="https://via.placeholder.com/300" alt="Placeholder" className="modal-image" /> */}
        {/* <img src="https://res.cloudinary.com/jhhernan01/image/upload/v1721950446/rebuskate/dxjjacrnuw7qoie3kigf.png" alt="Placeholder" className="modal-image" /> */}
        <img src={imgUrl} alt="image" className="modal-image" />
        <div className="modal-buttons">
          <button className="btn" onClick={remover}>Eliminar Imagen</button>
          {/* <button className="btn" onClick={() => alert('Button 2 clicked')}>Button 2</button> */}
        </div>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;