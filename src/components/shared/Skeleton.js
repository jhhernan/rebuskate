import styled from 'styled-components';
import { colors, spacing } from '../../theme';
import { keyframes } from '../../utils/animations';

const SkeletonBase = styled.div`
  ${keyframes.shimmer}
  background: linear-gradient(
    90deg,
    ${colors.neutral[200]} 0%,
    ${colors.neutral[100]} 50%,
    ${colors.neutral[200]} 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: ${props => props.rounded ? '999px' : '8px'};
`;

export const SkeletonBox = styled(SkeletonBase)`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
`;

export const SkeletonText = styled(SkeletonBase)`
  width: ${props => props.width || '100%'};
  height: 14px;
  margin-bottom: ${spacing[2]};
`;

export const SkeletonCard = styled.div`
  background: ${colors.background.primary};
  border-radius: 16px;
  overflow: hidden;
`;

export const SkeletonCardImage = styled(SkeletonBase)`
  width: 100%;
  height: 200px;
  border-radius: 0;
`;

export const SkeletonCardContent = styled.div`
  padding: ${spacing[4]};
`;

// Complete skeleton card component
export const PostCardSkeleton = () => (
  <SkeletonCard>
    <SkeletonCardImage />
    <SkeletonCardContent>
      <SkeletonBox height="24px" width="80%" style={{ marginBottom: spacing[3] }} />
      <SkeletonText width="100%" />
      <SkeletonText width="90%" />
      <SkeletonText width="70%" />
      <div style={{ marginTop: spacing[4], display: 'flex', gap: spacing[2] }}>
        <SkeletonBox height="32px" width="80px" rounded />
        <SkeletonBox height="32px" width="60px" rounded />
      </div>
    </SkeletonCardContent>
  </SkeletonCard>
);
