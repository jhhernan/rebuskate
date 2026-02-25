import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { spacing } from '../../theme';
import { keyframes } from '../../utils/animations';
import { PostCard } from './PostCard';
import { useIntersectionObserver } from '../../utils/scroll';

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

const AnimatedCard = styled.div`
  ${keyframes.slideUp}
  opacity: ${props => props.isVisible ? 1 : 0};
  animation: ${props => props.isVisible ? 'slideUp 0.5s ease-out forwards' : 'none'};
  animation-delay: ${props => props.delay}ms;
`;

const PostCardWrapper = ({ post, index }) => {
  const [setElement, isVisible] = useIntersectionObserver();

  return (
    <AnimatedCard
      ref={setElement}
      isVisible={isVisible}
      delay={Math.min(index * 50, 300)}
    >
      <PostCard post={post} />
    </AnimatedCard>
  );
};

export const PostGrid = ({ posts = [] }) => {
  return (
    <GridContainer>
      {posts.map((post, index) => (
        <PostCardWrapper key={post._id || index} post={post} index={index} />
      ))}
    </GridContainer>
  );
};
