import React from 'react';
import styled from 'styled-components';
import { spacing } from '../../theme';
import { PostCardSkeleton } from '../shared/Skeleton';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing[6]};
  padding: 0 ${spacing[4]};
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[6]};
    padding: 0 ${spacing[6]};
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacing[8]};
    padding: 0 ${spacing[10]};
  }
`;

export const SkeletonGrid = ({ count = 6 }) => {
  return (
    <GridContainer>
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </GridContainer>
  );
};
