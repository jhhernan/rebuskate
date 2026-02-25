import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { intlFormatDistance } from 'date-fns';
import { colors, spacing, shadows } from '../../theme';
import { transitions } from '../../utils/animations';
import { ImageCarousel } from '../shared/ImageCarousel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';

const Card = styled.div`
  background: ${colors.background.primary};
  border-radius: 16px;
  box-shadow: ${shadows.base};
  overflow: hidden;
  transition: all ${transitions.base};
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: ${shadows.primaryHover};
  }
`;

const CardContent = styled.div`
  padding: ${spacing[4]};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TypeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${spacing[1]} ${spacing[3]};
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${spacing[3]};
  align-self: flex-start;

  ${props => {
    if (props.type === 'service') {
      return `
        background: linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.light});
        color: ${colors.text.inverse};
      `;
    } else if (props.type === 'work') {
      return `
        background: linear-gradient(135deg, ${colors.secondary.main}, ${colors.secondary.light});
        color: ${colors.text.inverse};
      `;
    } else {
      return `
        background: ${colors.neutral[200]};
        color: ${colors.text.primary};
      `;
    }
  }}
`;

const Title = styled.h3`
  margin: 0 0 ${spacing[2]} 0;
  font-size: 18px;
  font-weight: 700;
  color: ${colors.text.primary};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  margin: 0 0 ${spacing[4]} 0;
  font-size: 14px;
  color: ${colors.text.secondary};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[2]};
  padding-top: ${spacing[3]};
  border-top: 1px solid ${colors.neutral[200]};
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
  flex: 1;
  min-width: 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  font-size: 12px;
  color: ${colors.text.secondary};

  svg {
    font-size: 16px;
    color: ${colors.text.tertiary};
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${colors.neutral[100]};
  color: ${colors.text.secondary};
  cursor: pointer;
  transition: all ${transitions.fast};
  flex-shrink: 0;

  &:hover {
    background: ${colors.primary.main};
    color: ${colors.text.inverse};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post._id}`);
  };

  const handleShare = (event) => {
    event.stopPropagation();
    const newUrl = "https://api.whatsapp.com/send/?text=" +
      encodeURIComponent("Creo que esta oportunidad puede interesarte: ") +
      "https://mellifluous-belekoy-48bd91.netlify.app/post/" + post._id;
    window.location = newUrl;
  };

  const getTypeLabel = (type) => {
    if (type === 'service') return 'Servicio';
    if (type === 'work') return 'Trabajo';
    return type;
  };

  const timeAgo = post.createdAt
    ? intlFormatDistance(new Date(post.createdAt), new Date(), { locale: 'es' })
    : '';

  // Check if post has images (could be images or imageList property)
  const postImages = post.images || post.imageList || [];
  const hasImages = postImages.length > 0;

  return (
    <Card onClick={handleCardClick}>
      {hasImages && <ImageCarousel images={postImages} />}

      <CardContent>
        <TypeBadge type={post.type}>
          {getTypeLabel(post.type)}
        </TypeBadge>

        <Title>{post.title}</Title>
        <Description>{post.description}</Description>

        <CardFooter>
          <InfoRow>
            <InfoItem>
              <LocationOnIcon />
              <span>{post.city}, {post.department}</span>
            </InfoItem>
            {timeAgo && (
              <InfoItem>
                <AccessTimeIcon />
                <span>{timeAgo}</span>
              </InfoItem>
            )}
          </InfoRow>

          <ShareButton onClick={handleShare} title="Compartir">
            <ShareIcon fontSize="small" />
          </ShareButton>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
