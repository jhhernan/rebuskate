import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({ onClose, imgUrl, images, initialIndex = 0, remover}) => {
  const imageList = images && images.length > 0 ? images : imgUrl ? [imgUrl] : [];
  const imageCount = imageList.length;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const hasMultipleImages = imageCount > 1;
  const currentImage = imageList[currentIndex] || imageList[0];

  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  }

  const handleOverlayClick = (event) => {
    event.stopPropagation();
    onClose();
  }

  const handleModalClick = (event) => {
    event.stopPropagation();
  }

  const handlePrevious = (event) => {
    event.stopPropagation();
    showPreviousImage();
  }

  const handleNext = (event) => {
    event.stopPropagation();
    showNextImage();
  }

  const handleThumbnailClick = (event, imageIndex) => {
    event.stopPropagation();
    setCurrentIndex(imageIndex);
  }

  const showPreviousImage = () => {
    setCurrentIndex((index) => (index - 1 + imageCount) % imageCount);
  }

  const showNextImage = () => {
    setCurrentIndex((index) => (index + 1) % imageCount);
  }

  const handleTouchStart = (event) => {
    if (!hasMultipleImages) {
      return;
    }
    setTouchStartX(event.touches[0].clientX);
  }

  const handleTouchEnd = (event) => {
    if (!hasMultipleImages || touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 42;

    if (Math.abs(swipeDistance) >= swipeThreshold) {
      if (swipeDistance > 0) {
        showPreviousImage();
      } else {
        showNextImage();
      }
    }

    setTouchStartX(null);
  }

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowLeft' && imageCount > 1) {
        setCurrentIndex((index) => (index - 1 + imageCount) % imageCount);
      }
      if (event.key === 'ArrowRight' && imageCount > 1) {
        setCurrentIndex((index) => (index + 1) % imageCount);
      }
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageCount, onClose]);

  useEffect(() => {
    setCurrentIndex(Math.min(initialIndex, Math.max(imageCount - 1, 0)));
  }, [imageCount, initialIndex, images]);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentImage]);

  if (!currentImage) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={handleModalClick}>
        <div className="modal-stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {!imageLoaded && (
            <div className="modal-loader" aria-live="polite">
              Cargando...
            </div>
          )}
          {hasMultipleImages && (
            <button className="modal-nav modal-nav-left" onClick={handlePrevious} aria-label="Imagen anterior">
              &lt;
            </button>
          )}
          <img
            src={currentImage}
            alt=""
            className={`modal-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
          {hasMultipleImages && (
            <button className="modal-nav modal-nav-right" onClick={handleNext} aria-label="Imagen siguiente">
              &gt;
            </button>
          )}
        </div>
        {hasMultipleImages && (
          <>
            <div className="modal-counter">{currentIndex + 1} / {imageCount}</div>
            <div className="modal-thumbnails">
              {imageList.map((image, idx) => (
                <button
                  key={`${image}-${idx}`}
                  className={`modal-thumbnail ${idx === currentIndex ? 'active' : ''}`}
                  onClick={(event) => handleThumbnailClick(event, idx)}
                  aria-label={`Ver imagen ${idx + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </>
        )}
        {/* <div className="modal-buttons">
          <button className="btn" onClick={remover}>Eliminar Imagen</button>
        </div> */}
        <button className="image-viewer-close-btn" onClick={handleClose}>Cerrar</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
