import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import * as S from './styled';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

import useRefreshToken from './hooks/useRefreshToken';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import Menu from './components/Menu';
import SignedOutMenu from './components/SignedOutMenu';
import { HeroSection } from './components/home/HeroSection';
import { FilterChips } from './components/home/FilterChips';
import { PostGrid } from './components/home/PostGrid';
import { FloatingActionButton } from './components/home/FloatingActionButton';
import { EmptyState } from './components/home/EmptyState';
import { SkeletonGrid } from './components/home/SkeletonGrid';

import { colors, spacing } from './theme';


// Styled components for page layout
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${colors.background.secondary};
`;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${colors.background.primary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

const ContentArea = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${spacing[6]} 0 ${spacing[12]} 0;

  @media (max-width: 640px) {
    padding: ${spacing[4]} 0 ${spacing[10]} 0;
  }
`;

const MailBadgeContainer = styled(Link)`
  position: fixed;
  top: ${spacing[4]};
  right: ${spacing[4]};
  z-index: 51;
  text-decoration: none;

  @media (min-width: 640px) {
    right: ${spacing[6]};
  }
`;

function App() {
  const [PostsList, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuthUser();

  console.log('Probando...', auth);

  useEffect(() => {
    console.log('Dentro de Use effect');
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      console.log('Voy a intentar axios...')
      try {
        const response = await axiosPrivate.get(process.env.REACT_APP_BACKEND_SERVER + '/posts', {
          signal: controller.signal
        })

        console.log('La respuesta:', response.data);

        if (isMounted) {
          setPosts(response.data);
          setFilteredPosts(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log('El error es:', err)
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    getPosts();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  // Handle filter changes from FilterChips component
  const handleFilterChange = (department, city) => {
    console.log('Filtering by:', department, city);

    if (!department) {
      // No filters - show all posts
      setFilteredPosts(PostsList);
    } else if (!city) {
      // Department only
      setFilteredPosts(PostsList.filter(post => post.department === department));
    } else {
      // Both department and city
      setFilteredPosts(PostsList.filter(post =>
        post.department === department && post.city === city
      ));
    }
  };

  const handleCreateClick = () => {
    navigate('/create');
  };

  return (
    <PageContainer>
      <TopBar>
        <S.Menu>
          {auth ? <Menu /> : <SignedOutMenu />}
        </S.Menu>
      </TopBar>

      {/* Mail badge - floating in top right */}
      {auth && (
        <MailBadgeContainer to="/custom">
          <Badge badgeContent={4} color="error">
            <MailIcon fontSize="large" sx={{ color: colors.primary.main }} />
          </Badge>
        </MailBadgeContainer>
      )}

      <HeroSection />

      <ContentArea>
        <FilterChips
          posts={PostsList}
          onFilterChange={handleFilterChange}
        />

        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : filteredPosts.length === 0 ? (
          <EmptyState onCreateClick={handleCreateClick} />
        ) : (
          <PostGrid posts={filteredPosts} />
        )}
      </ContentArea>

      <FloatingActionButton onClick={handleCreateClick} />
    </PageContainer>
  );
}

export default App;
