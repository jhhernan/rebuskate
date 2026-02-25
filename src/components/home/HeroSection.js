import React from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../../theme';
import { keyframes } from '../../utils/animations';

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  min-height: 280px;
  background: linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.light} 50%, ${colors.secondary.main} 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (min-width: 1024px) {
    height: 60vh;
    min-height: 400px;
  }

  /* Decorative blur circles */
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    filter: blur(60px);
  }

  &::before {
    width: 300px;
    height: 300px;
    top: -100px;
    left: -100px;
  }

  &::after {
    width: 400px;
    height: 400px;
    bottom: -150px;
    right: -150px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: ${spacing[4]};

  ${keyframes.fadeIn}
  animation: fadeIn 0.8s ease-out;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.02em;

  background: linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const LogoDomain = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
`;

const Tagline = styled.p`
  margin: ${spacing[4]} 0 0 0;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  max-width: 600px;

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

export const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Logo>
          rebuscate<LogoDomain>.com</LogoDomain>
        </Logo>
        <Tagline>
          Encuentra la persona experta que necesitas aquí!!!
        </Tagline>
      </HeroContent>
    </HeroContainer>
  );
};
