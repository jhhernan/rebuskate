import { useState, useEffect } from 'react';
import { intlFormatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import './App.css';
import * as S from './styled';
import spinner from './img/spinner.gif';
import Menu from './components/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import useAxiosPrivate from './hooks/useAxiosPrivate';

import CustomPost from './components/CustomPost'

function App() {

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    console.log('Dentro de Use effect');

    const controller = new AbortController();

    const getUsers = async () => {
      console.log('Voy a intentar axios...')
      try {
        const response = await axiosPrivate.get(process.env.REACT_APP_BACKEND_SERVER + '/posts/custom', {
          signal: controller.signal
        })

        console.log('La respuesta:', response.data);

        setFilteredPosts(response.data);
        setIsLoading(false);

      } catch (err) {
        console.log('El error es:', err)
      }
    }

      getUsers();

      return () => {
        controller.abort();
      }

  }, [axiosPrivate])


  return (
    <div className="App">
      <header className="App-header">
        <S.AppShell>
          <S.TopBar>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <S.BrandMark>
                <S.BrandDot>R</S.BrandDot>
                <S.BrandName>rebuscate<span>.com</span></S.BrandName>
              </S.BrandMark>
            </Link>
            <Menu />
          </S.TopBar>

          <S.Hero>
            <S.HeroKicker><AssignmentIndIcon fontSize="small" /> Panel de publicaciones</S.HeroKicker>
            <S.HeroTitle>Mis publicaciones.</S.HeroTitle>
            <S.HeroText>Gestiona las oportunidades que publicaste, revisa interesados y elimina anuncios que ya no estén activos.</S.HeroText>
            <S.HeroActions>
              <Link to="/create" style={{ textDecoration: 'none' }}>
                <S.PrimaryAction><AddCircleOutlineIcon fontSize="small" /> Crear anuncio</S.PrimaryAction>
              </Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <S.SecondaryAction><WorkOutlineIcon fontSize="small" /> Ver oportunidades</S.SecondaryAction>
              </Link>
            </S.HeroActions>
          </S.Hero>

          <S.SectionHeader>
            <S.SectionTitle>Ofertas que has publicado</S.SectionTitle>
            <S.ResultCount>{filteredPosts.length} resultados</S.ResultCount>
          </S.SectionHeader>

          {isLoading && <img style={{ "width": "40px", "align-self": "center", "padding-top": "34px" }} src={spinner} alt="loading..." />}

          {!isLoading && filteredPosts.length === 0 && (
            <S.EmptyState>Aún no has publicado ofertas. Crea un anuncio para recibir interesados.</S.EmptyState>
          )}

          <S.FeedGrid>
            {filteredPosts.map((post, idx) => (
              <CustomPost
                key={idx}
                post={post}
                title={post.title}
                description={post.description}
                type={post.type}
                location={post.location}
                time={intlFormatDistance(new Date(post.createdAt), new Date(), { addSuffix: true, locale: 'es' })}
              />
            ))}
          </S.FeedGrid>
        </S.AppShell>
      </header>
    </div>
  );
}

export default App;
