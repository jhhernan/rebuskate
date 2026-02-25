import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, shadows, spacing } from '../../theme';
import { transitions } from '../../utils/animations';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${colors.neutral[200]};
  overflow: hidden;
`;

const CarouselImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.src ? `url(${props.src})` : colors.neutral[300]};
  background-size: cover;
  background-position: center;
  transition: opacity ${transitions.fast};
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 8px;' : 'right: 8px;'}
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: ${colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${shadows.md};
  transition: all ${transitions.fast};
  z-index: 2;

  &:hover {
    background: ${colors.background.primary};
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
`;

const Indicator = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? colors.background.primary : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all ${transitions.fast};
  padding: 0;

  &:hover {
    background: ${colors.background.primary};
    transform: scale(1.2);
  }
`;

const ImageCount = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  z-index: 2;
`;

export const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <CarouselContainer>
        <CarouselImage />
      </CarouselContainer>
    );
  }

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <CarouselContainer>
      <CarouselImage src={images[currentIndex]} />

      {images.length > 1 && (
        <>
          <ImageCount>{currentIndex + 1} / {images.length}</ImageCount>

          <CarouselButton direction="left" onClick={goToPrevious}>
            <ChevronLeftIcon />
          </CarouselButton>

          <CarouselButton direction="right" onClick={goToNext}>
            <ChevronRightIcon />
          </CarouselButton>

          <CarouselIndicators>
            {images.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentIndex}
                onClick={(e) => goToSlide(index, e)}
              />
            ))}
          </CarouselIndicators>
        </>
      )}
    </CarouselContainer>
  );
};
