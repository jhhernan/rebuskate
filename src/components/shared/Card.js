import styled from 'styled-components';
import { colors, shadows, spacing } from '../../theme';
import { transitions } from '../../utils/animations';

export const Card = styled.div`
  background: ${colors.background.primary};
  border-radius: 16px;
  box-shadow: ${shadows.base};
  overflow: hidden;
  transition: all ${transitions.base};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  &:hover {
    ${props => props.clickable && `
      transform: translateY(-4px) scale(1.02);
      box-shadow: ${shadows.primaryHover};
    `}
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.src ? `url(${props.src})` : colors.neutral[200]};
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const CardContent = styled.div`
  padding: ${spacing[4]};
`;

export const CardTitle = styled.h3`
  margin: 0 0 ${spacing[2]} 0;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.text.primary};
  line-height: 1.4;
`;

export const CardDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${colors.text.secondary};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.clamp || 3};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[3]} ${spacing[4]};
  border-top: 1px solid ${colors.neutral[200]};
`;
