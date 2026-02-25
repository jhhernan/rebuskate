import styled from 'styled-components';
import { colors, shadows, spacing } from '../../theme';
import { transitions } from '../../utils/animations';

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  padding: ${props => {
    switch (props.size) {
      case 'small': return `${spacing[2]} ${spacing[3]}`;
      case 'large': return `${spacing[4]} ${spacing[6]}`;
      default: return `${spacing[3]} ${spacing[4]}`;
    }
  }};
  font-family: inherit;
  font-size: ${props => props.size === 'small' ? '14px' : '16px'};
  font-weight: 600;
  border: none;
  border-radius: ${props => props.rounded ? '999px' : '8px'};
  cursor: pointer;
  transition: all ${transitions.base};
  position: relative;
  overflow: hidden;

  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: ${colors.primary.gradient};
          color: ${colors.text.inverse};
          box-shadow: ${shadows.sm};

          &:hover:not(:disabled) {
            box-shadow: ${shadows.md};
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return `
          background: ${colors.background.primary};
          color: ${colors.primary.main};
          border: 2px solid ${colors.primary.main};

          &:hover:not(:disabled) {
            background: ${colors.primary.main};
            color: ${colors.text.inverse};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${colors.text.primary};
          border: 1px solid ${colors.neutral[300]};

          &:hover:not(:disabled) {
            border-color: ${colors.primary.main};
            color: ${colors.primary.main};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${colors.text.secondary};

          &:hover:not(:disabled) {
            background: ${colors.neutral[100]};
            color: ${colors.text.primary};
          }
        `;
      default:
        return `
          background: ${colors.neutral[200]};
          color: ${colors.text.primary};

          &:hover:not(:disabled) {
            background: ${colors.neutral[300]};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Loading state */
  ${props => props.loading && `
    pointer-events: none;
    opacity: 0.7;
  `}
`;
