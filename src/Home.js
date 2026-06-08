import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { intlFormatDistance, formatRelative, subDays } from 'date-fns';
import { Link } from 'react-router-dom';
import './App.css';
import * as S from './styled';
import mail from './img/mail.png';
import service_icon from './img/service_icon.png';
import drill_icon from './img/drill_icon.png';
import spinner from './img/spinner.gif';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

import useRefreshToken from './hooks/useRefreshToken';

import useAxiosPrivate from './hooks/useAxiosPrivate';

import Post from './components/Post'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Menu from './components/Menu';
import SignedOutMenu from './components/SignedOutMenu';
import { departments, getCitiesForDepartment } from './locations';


  
function App() {

  const [PostsList, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const  refresh  = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuthUser();

  console.log('Probando...', auth);

  useEffect(() => {
    console.log('Dentro de Use effect');
    let isMounted = true;

    const controller = new AbortController();

    const getUsers = async () => {
      console.log('Voy a intentar axios...')
      try {
        const response = await axiosPrivate.get(process.env.REACT_APP_BACKEND_SERVER + '/posts', {
          signal: controller.signal
        })

        console.log('La respuesta:', response.data);

        setPosts(response.data);
        setFilteredPosts(response.data);
        setIsLoading(false);

      } catch (err) {
        console.log('El error es:', err)
      }
    }

      getUsers();

      return () => {
        isMounted = false;
        controller.abort();
      }

  }, [])

//   useEffect(() => {
//     // fetch('http://192.168.2.7:3000/posts')
//     //  OJO Se agrego proxy en el package.json y se cambio configuracion de webpack en node_modules/react-scripts/config/webpackDevServer.config.js
//     // se cambio el disbleFirewall a false y se cambia el fetch a solo: /posts sin urlBase
//     fetch('/posts')
//        .then((response) => response.json())
//        .then((data) => {
//           console.log(data);
//           setPosts(data);
//        })
//        .catch((err) => {
//           console.log(err.message);
//        });
//  }, []);  



  const getComponentFromString = (name) => {
    switch (name) {
      case 'service_icon':
        return service_icon;
      case 'mail':
        return mail;
      case 'drill_icon':
        return drill_icon;
      default:
        return null; // Return null or handle other cases as needed
    }
  };

  const getPostIcon = (post) => {
    const savedIcon = getComponentFromString(post.icon);

    if ((post.type || "").toUpperCase().includes("SE NECESITA")) {
      return null;
    }

    if (savedIcon) {
      return savedIcon;
    }

    return null;
  };

  const handleDepartmentChange = (e) => {
    const nextDepartment = e.target.value;
    console.log('Departamento:', nextDepartment);
    setDepartment(nextDepartment);
    setCity("");
    setFilteredPosts(nextDepartment ? PostsList.filter(post => post.department === nextDepartment) : PostsList);
  };

  const handleCityChange = (e) => {
    const nextCity = e.target.value;
    setCity(nextCity);
    setFilteredPosts(PostsList.filter(post => {
      const departmentMatches = department ? post.department === department : true;
      const cityMatches = nextCity ? post.city === nextCity : true;
      return departmentMatches && cityMatches;
    }));
  };

  const cities = getCitiesForDepartment(department);

  return (
    <div className="App">
      <header className="App-header">
        <S.AppShell>
          <S.TopBar>
            <S.BrandMark>
              <S.BrandDot>R</S.BrandDot>
              <S.BrandName>rebuscate<span>.com</span></S.BrandName>
            </S.BrandMark>
            {auth ? <Menu /> : <SignedOutMenu />}
          </S.TopBar>

          <S.Hero>
            <S.HeroTitle>Rebuscate hoy!!!</S.HeroTitle>
            <S.HeroText>Publica lo que necesitas o revisa oportunidades activas por ciudad.</S.HeroText>
            <S.HeroText>Encuentra una oportunidad para ti ahora!</S.HeroText>
            <S.HeroActions>
              <Link to="/create">
                <S.PrimaryAction><AddCircleOutlineIcon fontSize="small" /> Publicar aviso</S.PrimaryAction>
              </Link>
              <Link to="/custom">
                <S.SecondaryAction>
                  <Badge badgeContent={auth ? 4 : null} color="error">
                    <MailIcon fontSize="small" />
                  </Badge>
                  Mis publicaciones
                </S.SecondaryAction>
              </Link>
            </S.HeroActions>
          </S.Hero>

          <S.FilterPanel>
            <S.FilterTitle><SearchIcon fontSize="small" /> Filtrar oportunidades</S.FilterTitle>
            <S.SelectorContainer>
              <select onChange={handleDepartmentChange} value={department}>
                <option value="">Todos los departamentos</option>
                {departments.map((departmentOption) => (
                  <option key={departmentOption} value={departmentOption}>{departmentOption}</option>
                ))}
              </select>
              <select onChange={handleCityChange} value={city}>
                <option value="">Todas las ciudades</option>
                {cities.map((cityOption) => (
                  <option key={cityOption} value={cityOption}>{cityOption}</option>
                ))}
              </select>
            </S.SelectorContainer>
          </S.FilterPanel>

          <S.SectionHeader>
            <S.SectionTitle>Oportunidades disponibles</S.SectionTitle>
            <S.ResultCount>{filteredPosts.length} resultados</S.ResultCount>
          </S.SectionHeader>

          {isLoading && <img style={{ "width": "40px", "align-self": "center", "padding-top": "34px" }} src={spinner} alt="loading..." />}

          {!isLoading && filteredPosts.length === 0 && (
            <S.EmptyState>No hay publicaciones para este filtro. Prueba otra ciudad o publica una nueva oportunidad.</S.EmptyState>
          )}

          <S.FeedGrid>
            {filteredPosts.map((post, idx) => (
              <Post
                key={idx}
                post={post}
                icon={getPostIcon(post)}
                title={post.title}
                description={post.description}
                type={post.type}
                location={post.location}
                time={intlFormatDistance(new Date(post.createdAt), new Date(), { addSuffix: true, locale:'es' })}
              />
            ))}
          </S.FeedGrid>
        </S.AppShell>
      </header>
    </div>
  );
}

export default App;
