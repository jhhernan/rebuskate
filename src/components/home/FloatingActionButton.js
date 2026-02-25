import React from 'react';
import styled from 'styled-components';
import { colors, shadows, spacing } from '../../theme';
import { transitions } from '../../utils/animations';
import { useScrollDirection } from '../../utils/scroll';
import AddIcon from '@mui/icons-material/Add';

const FAB = styled.button`
  position: fixed;
  bottom: ${spacing[6]};
  right: ${spacing[6]};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: ${colors.primary.gradient};
  color: ${colors.text.inverse};
  cursor: pointer;
  box-shadow: ${shadows.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${transitions.base};
  z-index: 100;

  transform: ${props => props.hidden ? 'translateY(100px)' : 'translateY(0)'};
  opacity: ${props => props.hidden ? 0 : 1};

  svg {
    font-size: 28px;
    transition: transform ${transitions.base};
  }

  &:hover {
    box-shadow: ${shadows['2xl']};
    transform: ${props => props.hidden ? 'translateY(100px)' : 'translateY(-4px) scale(1.1)'};

    svg {
      transform: rotate(90deg);
    }
  }

  &:active {
    transform: ${props => props.hidden ? 'translateY(100px)' : 'translateY(-2px) scale(1.05)'};
  }

  @media (max-width: 640px) {
    bottom: ${spacing[4]};
    right: ${spacing[4]};
    width: 56px;
    height: 56px;
  }
`;

export const FloatingActionButton = ({ onClick }) => {
  const scrollDirection = useScrollDirection();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only hide on mobile when scrolling down
  const shouldHide = isMobile && scrollDirection === 'down';

  return (
    <FAB onClick={onClick} hidden={shouldHide} title="Crear anuncio">
      <AddIcon />
    </FAB>
  );
};
