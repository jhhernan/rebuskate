import styled from 'styled-components';

const pageWidth = '860px';
const border = '#d9e0e8';
const ink = '#111827';
const muted = '#64748b';
const brand = '#0f766e';
const brandDark = '#115e59';
const accent = '#f97316';

export const AppShell = styled.div`
  width: min(calc(100% - 28px), ${pageWidth});
  margin: 0 auto;
  padding: 12px 0 40px;
`;

export const TopBar = styled.div`
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const BrandHeader = styled.div`
  width: min(calc(100% - 28px), ${pageWidth});
  min-height: 54px;
  margin: 0 auto;
  padding: 12px 0 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const BrandMark = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${ink};
  font-size: 1.48rem;
  font-weight: 900;

  span {
    color: ${brand};
  }

  @media (min-width: 760px) {
    font-size: 1.64rem;
  }
`;

export const BrandName = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 0;
  white-space: nowrap;
`;

export const BrandDot = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: ${brand};
  color: #fff;
  font-size: 1rem;
  font-weight: 900;
  box-shadow: 0 12px 26px rgba(15, 118, 110, 0.22);
`;

export const Hero = styled.section`
  margin-top: 12px;
  padding: 26px 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, #0f766e 0%, #115e59 58%, #111827 100%);
  color: #fff;
  text-align: left;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 180px;
    height: 180px;
    border-radius: 999px;
    right: -70px;
    bottom: -84px;
    background: rgba(249, 115, 22, 0.38);
  }

  @media (min-width: 760px) {
    padding: 34px 30px;
  }
`;

export const HeroKicker = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #ccfbf1;
  font-size: 0.78rem;
  font-weight: 850;
`;

export const HeroTitle = styled.h1`
  max-width: 650px;
  margin: 16px 0 10px;
  font-size: clamp(2rem, 9vw, 4.25rem);
  line-height: 0.98;
  font-weight: 950;
  letter-spacing: 0;
`;

export const HeroText = styled.p`
  max-width: 560px;
  margin: 0;
  color: #d1fae5;
  font-size: clamp(1rem, 4vw, 1.15rem);
  line-height: 1.5;
`;

export const HeroActions = styled.div`
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

export const PrimaryAction = styled.div`
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  border-radius: 999px;
  background: ${accent};
  color: #fff;
  font-size: 0.92rem;
  font-weight: 900;
  box-shadow: 0 14px 30px rgba(249, 115, 22, 0.26);
`;

export const SecondaryAction = styled.div`
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 0.92rem;
  font-weight: 850;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const FilterPanel = styled.section`
  margin-top: -18px;
  position: relative;
  z-index: 1;
  padding: 14px;
  border: 1px solid ${border};
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(12px);
`;

export const FilterTitle = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${ink};
  font-size: 0.82rem;
  font-weight: 900;
  text-align: left;
`;

export const SectionHeader = styled.div`
  margin: 24px 0 12px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${ink};
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 950;
`;

export const ResultCount = styled.div`
  color: ${muted};
  font-size: 0.84rem;
  font-weight: 750;
  white-space: nowrap;
`;

export const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }
`;

export const EmptyState = styled.div`
  padding: 28px 18px;
  border: 1px dashed #cbd5e1;
  border-radius: 14px;
  background: #fff;
  color: ${muted};
  font-size: 0.96rem;
  line-height: 1.5;
  text-align: left;
`;

export const AuthHeader = styled.header`
  width: min(calc(100% - 32px), 420px);
  margin: 0 auto;
  padding: 18px 0 10px;

  .auth-title {
    width: 100%;
    margin: 0;
    font-size: clamp(2.2rem, 10vw, 3.1rem);
  }
`;

export const AuthShell = styled.main`
  width: 100%;
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 16px 32px;
  box-sizing: border-box;
`;

export const Title = styled.div`
  width: min(calc(100% - 32px), ${pageWidth});
  margin: 22px auto 6px;
  color: ${brand};
  font-size: clamp(2.35rem, 12vw, 4.75rem);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: 0;
  text-align: left;
  text-decoration: none;

  span {
    color: ${ink} !important;
  }
`;

export const Title2 = styled(Title)``;

export const SubtitleDecoration = styled.div`
  width: min(calc(100% - 32px), ${pageWidth});
  margin: 16px auto 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Subtitle = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid ${border};
  border-radius: 999px;
  background: #fff;
  color: ${ink};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
`;

export const Description = styled.div`
  width: min(calc(100% - 32px), ${pageWidth});
  margin: 0 auto;
  padding: 10px 0 16px;
  color: ${muted};
  font-size: clamp(1rem, 4vw, 1.2rem);
  line-height: 1.45;
  text-align: left;
`;

export const Tag = styled.div`
  width: min(calc(100% - 32px), ${pageWidth});
  margin: 0 auto;
  padding: 12px 0 8px;
  color: ${ink};
  font-size: 0.92rem;
  font-weight: 750;
  line-height: 1.35;
  text-align: left;
`;

export const ContactOption = styled.span`
  color: ${ink};
  font-size: 0.92rem;
  font-weight: 750;
`;

export const ButtonContainer = styled.div`
  width: min(calc(100% - 32px), ${pageWidth});
  margin: 8px auto 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Button = styled.div`
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 999px;
  background: ${brand};
  color: #fff;
  font-size: 0.86rem;
  font-weight: 850;
  letter-spacing: 0;
  box-shadow: 0 10px 26px rgba(229, 57, 53, 0.22);
  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: ${brandDark};
    transform: translateY(-1px);
  }
`;

export const SelectorContainer = styled.div`
  width: min(calc(100% - 32px), ${pageWidth});
  margin: 0 auto 14px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  select {
    width: 100%;
    min-height: 46px;
    padding: 0 14px;
    border: 1px solid ${border} !important;
    border-radius: 8px !important;
    background: #fff !important;
    color: ${ink} !important;
    font-size: 0.95rem;
    font-weight: 650;
    text-align: left !important;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
  }

  @media (min-width: 620px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const SelectorContainer2 = styled(SelectorContainer)`
  justify-content: center;
`;

export const Select = styled.select`
  width: 100%;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid ${border};
  border-radius: 8px;
  background: #fff;
  color: ${ink};
  font-size: 0.95rem;
  outline: none;

  &:focus {
    border-color: ${brand};
    box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.14);
  }
`;

export const Option = styled.option``;

export const DescriptionBox = styled.div`
  width: min(calc(100% - 32px), ${pageWidth});
  margin: 0 auto;
  position: relative;
  color: ${ink};
  font-size: 1rem;
  text-align: left;
`;

export const DescriptionInput = styled.textarea`
  width: 100%;
  min-height: 170px;
  padding: 14px;
  box-sizing: border-box;
  border: 1px solid ${border};
  border-radius: 8px;
  background: #fff;
  color: ${ink};
  resize: vertical;
  font-size: 1rem;
  line-height: 1.45;
  outline: none;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);

  &:focus {
    border-color: ${brand};
    box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.14);
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 180px;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export const PreviewContainer2 = styled.div`
  display: ${props => props.isVisible ? 'flex' : 'none'};
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 14px;

  img {
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid ${border};
  }
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 56px);
  gap: 8px;
`;

export const PreviewTile = styled.button`
  width: 56px;
  height: 56px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: #e2e8f0;
  cursor: pointer;

  && {
    border-radius: 8px;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 8px;
    object-fit: cover;
  }
`;

export const VisuallyHiddenFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const PreviewMore = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.58);
  color: #fff;
  font-size: 0.92rem;
  font-weight: 900;
`;

export const PublishButton = styled.button`
  display: ${props => props.isVisible ? 'inline-flex' : 'none'};
  align-items: center;
  justify-content: center;
  width: min(calc(100% - 32px), 360px);
  min-height: 48px;
  margin: 8px auto 0;
  border: 0;
  border-radius: 999px;
  background: ${brand};
  color: #fff;
  font-size: 1rem;
  font-weight: 850;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(229, 57, 53, 0.24);
  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: ${brandDark};
    transform: translateY(-1px);
  }
`;

export const PostContainer = styled.div`
  width: 100%;
  min-height: ${props => props.extended ? '190px' : '0'};
  margin: 0;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid ${border};
  border-radius: 16px;
  background: #fff;
  color: ${ink};
  position: relative;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;

  &:hover {
    border-color: #c7d0da;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
    transform: translateY(-1px);
  }
`;

export const JobCardTop = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 12px;
  align-items: start;
`;

export const JobAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: #ccfbf1;
  color: ${brandDark};
  font-weight: 950;

  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`;

export const JobMain = styled.div`
  min-width: 0;
`;

export const PostType = styled.article`
  padding-right: 78px;
  color: ${brand};
  font-size: 0.72rem;
  font-weight: 900;
  line-height: 1.2;
  text-align: left;
  text-transform: uppercase;
`;

export const PostTitle = styled.article`
  display: ${props => props.isVisible ? 'block' : 'none'};
  margin-top: 10px;
  color: ${ink};
  font-size: 1.02rem;
  font-weight: 850;
  line-height: 1.38;
  text-align: left;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: ${props => props.isVisible ? '-webkit-box' : 'none'};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const PostExtended = styled.article`
  display: ${props => props.isVisible ? 'block' : 'none'};
  margin-top: 10px;
  color: ${ink};
  font-size: 0.98rem;
  line-height: 1.5;
  text-align: left;
`;

export const PostTime = styled.article`
  position: absolute;
  right: 16px;
  top: 16px;
  max-width: 92px;
  color: ${muted};
  font-size: 0.72rem;
  line-height: 1.2;
  text-align: right;
`;

export const PostLocation = styled.article`
  color: ${muted};
  font-size: 0.78rem;
  font-weight: 750;
`;

export const JobMetaRow = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

export const JobMeta = styled.div`
  min-height: 28px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0 9px;
  border-radius: 999px;
  background: #f8fafc;
  color: ${muted};
  font-size: 0.75rem;
  font-weight: 700;
`;

export const NotificationChooser = styled.div`
  display: ${props => props.isVisible ? 'block' : 'none'};
  margin-top: 16px;
  margin-bottom: 2px;
  font-size: 0.86rem;
`;

export const NotifyButton = styled.div`
  width: 100%;
  min-height: 42px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 999px;
  background: ${ink};
  color: #fff;
  font-size: 0.78rem;
  font-weight: 800;
  text-align: center;
  cursor: pointer;

  a {
    color: #fff !important;
    text-decoration: none !important;
  }
`;

export const JobActionRow = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const InterestButton = styled.button`
  flex: 1;
  min-height: 42px;
  border: 0;
  border-radius: 999px;
  background: ${props => props.active ? '#fff' : brand};
  color: ${props => props.active ? brand : '#fff'};
  border: 1px solid ${props => props.active ? brand : brand};
  font-size: 0.82rem;
  font-weight: 900;
`;

export const IconCircleButton = styled.button`
  width: 42px;
  min-width: 42px;
  min-height: 42px;
  border: 1px solid ${border};
  border-radius: 999px;
  background: #fff;
  color: ${ink};
  display: inline-grid;
  place-items: center;
`;

export const ContactStack = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;

export const PhotoUploadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 10px;
`;

export const ProfilePhotoTile = styled.button`
  width: 100%;
  aspect-ratio: 1;
  padding: 0;
  border: 1px solid ${border};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: #f8fafc;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PhotoRemoveButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 24px;
  min-width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.76);
  color: #fff;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
`;

export const PhotoUploadTile = styled.label`
  width: 100%;
  aspect-ratio: 1;
  border: 1px dashed #94a3b8;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #f8fafc;
  color: ${brand};
  cursor: pointer;

  input {
    display: none;
  }
`;

export const PhotoHelperText = styled.div`
  color: ${muted};
  font-size: 0.78rem;
  line-height: 1.35;
`;

export const KeywordInputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 44px;
  gap: 8px;
`;

export const KeywordInput = styled.input`
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid ${border};
  border-radius: 8px;
  background: #fff;
  color: ${ink};
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${brand};
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.14);
  }

  &:disabled {
    background: #f8fafc;
    color: ${muted};
  }
`;

export const KeywordAddButton = styled.button`
  width: 44px;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: ${brand};
  color: #fff;
  cursor: pointer;

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

export const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const KeywordChip = styled.span`
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 6px 0 12px;
  border-radius: 999px;
  background: #ecfeff;
  color: ${brandDark};
  font-size: 0.8rem;
  font-weight: 800;

  button {
    width: 24px;
    min-width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: transparent;
    color: ${brandDark};
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;

    &:hover {
      background: rgba(15, 118, 110, 0.12);
    }
  }
`;

export const Menu = styled.article`
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 2;
`;

export const Icon = styled.img`
  width: 34px;
  height: 34px;
  object-fit: contain;
  margin-right: 16px;
`;

export const IconCarouselContainer = styled.div`
  width: min(calc(100% - 32px), ${pageWidth});
  height: 120px;
  margin: 0 auto;
  overflow-x: auto;
  display: flex;
`;

export const IconCarouselContent = styled.div`
  flex: 0 0 auto;
  margin-right: 18px;
  padding: 10px;
  position: relative;
`;

export const IconImage = styled.span`
  position: absolute;
  top: ${props => props.extended ? '82px' : '25px'};
  height: 65px;
  width: 65px;
  border-radius: 50%;
  border: 1px solid ${border};
  background: ${props => `white url(${props.src}) no-repeat center center`};
  background-size: 35px;
`;

export const IconText = styled.div`
  position: absolute;
  bottom: -20px;
  width: 100%;
  font-size: 12px;
  color: ${muted};
`;

export const PostIcon = styled.span`
  position: absolute;
  left: -12px;
  top: ${props => props.extended ? '82px' : '25px'};
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid ${border};
  background: ${props => `white url(${props.src}) no-repeat center center`};
  background-size: 20px;
`;

export const FormContainer = styled.div`
  width: min(calc(100% - 32px), ${pageWidth});
  margin: 0 auto 14px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`;

export const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding-top: 6px;
`;

export const FormSectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${ink};
  font-size: 0.86rem;
  font-weight: 900;
  text-align: left;
`;

export const InlineSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  select {
    width: 100%;
    min-height: 46px;
    padding: 0 14px;
    border: 1px solid ${border};
    border-radius: 8px;
    background: #fff;
    color: ${ink};
    font-size: 0.95rem;
    font-weight: 650;
    outline: none;
  }

  @media (min-width: 620px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Label = styled.article`
  font-size: 0.92rem;
  font-weight: 750;
  color: ${ink};
`;

export const Test = styled.input`
  width: 100%;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid ${border};
  border-radius: 8px;
  font-size: 1rem;
`;

export const SelectContainer = styled.div`
  position: relative;
  margin: 0;
`;

export const SelectLabelButton = styled.button`
  min-height: 40px;
  min-width: 7rem;
  padding: 0 12px;
  border: 1px solid ${border};
  border-radius: 8px;
  background-color: #fff;
  color: ${ink};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
`;

export const DropdownStyle = styled.div`
  position: absolute;
  top: 44px;
  left: 0;
  max-height: 40vmax;
  min-width: 10rem;
  padding: 0.4rem;
  display: ${props => props.isVisible ? 'flex' : 'none'};
  flex-direction: column;
  border-radius: 8px;
  background: #fff;
  border: 1px solid ${border};
  overflow: auto;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.15rem 0;
  padding: 0.45rem 0.55rem;
  font-size: 0.9rem;
  font-weight: ${props => props.active ? '750' : '500'};
  color: ${props => props.active ? brand : ink};
  border-radius: 6px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #f8dede;
    color: ${brandDark};
    outline: none;
  }
`;
