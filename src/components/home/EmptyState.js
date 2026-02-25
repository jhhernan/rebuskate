import React from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../../theme';
import { Button } from '../shared/Button';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[12]} ${spacing[4]};
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${colors.neutral[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing[6]};

  svg {
    font-size: 60px;
    color: ${colors.neutral[400]};
  }
`;

const Title = styled.h2`
  margin: 0 0 ${spacing[3]} 0;
  font-size: 24px;
  font-weight: 700;
  color: ${colors.text.primary};
`;

const Description = styled.p`
  margin: 0 0 ${spacing[6]} 0;
  font-size: 16px;
  color: ${colors.text.secondary};
  line-height: 1.6;
`;

export const EmptyState = ({ onCreateClick }) => {
  return (
    <EmptyContainer>
      <IconWrapper>
        <SearchOffIcon />
      </IconWrapper>

      <Title>No se encontraron anuncios</Title>

      <Description>
        No hay anuncios que coincidan con los filtros seleccionados.
        Intenta ajustar tus criterios de búsqueda o crea un nuevo anuncio.
      </Description>

      {onCreateClick && (
        <Button variant="primary" size="large" onClick={onCreateClick}>
          Crear nuevo anuncio
        </Button>
      )}
    </EmptyContainer>
  );
};
