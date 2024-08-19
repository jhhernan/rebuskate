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

import useRefreshToken from './hooks/useRefreshToken';

import useAxiosPrivate from './hooks/useAxiosPrivate';

import CustomPost from './components/CustomPost'

function App() {

  const [PostsList, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const  refresh  = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    console.log('Dentro de Use effect');
    let isMounted = true;

    const controller = new AbortController();

    const getUsers = async () => {
      console.log('Voy a intentar axios...')
      try {
        const response = await axiosPrivate.get(process.env.REACT_APP_BACKEND_SERVER + '/posts/custom', {
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

  const handleDepartmentChange = (e) => {
    console.log('Departamento:', e.target.value);
    console.log('Filtrando...:', PostsList.filter(post => post.department === department))
    setDepartment(e.target.value);
    setCity("");
    setFilteredPosts(PostsList.filter(post => post.department === e.target.value));
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setFilteredPosts(PostsList.filter(post => post.department === department && post.city === e.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <S.Title>rebuscate<span style={{ "color": "black" }}>.com</span></S.Title>
        <S.Description> Encuentra la persona experta que necesitas aqui!!!</S.Description>
        <S.ButtonContainer>
          <Link to="/create" style={{ textDecoration: 'none' }} >
            <S.Button>CREAR ANUNCIO</S.Button>
          </Link>
          <S.Icon src={mail}></S.Icon>
        </S.ButtonContainer>

        <S.Description>Las ofertas que has publicado...</S.Description>

        {/* <S.Tag>Ubicacion:</S.Tag>
        <S.SelectorContainer>
          <select style={{ "background-color": "black", "color": "white",  "flex": "1", "padding": "10px 10px 10px 10px", "border-radius": "0", "-webkit-appearance": "none", "text-align": "center", "margin": "3px"}} 
            onChange={handleDepartmentChange} value={department}>
            <option value="">DEPARTAMENTO</option>
            <option value="Atlantico">Atlantico</option>
            <option value="Bolivar">Bolivar</option>
            <option value="Cordoba">Cordoba</option>
            <option value="Cesar">Cesar</option>
            <option value="Guajira">Guajira</option>
            <option value="Magdalena">Magdalena</option>
            <option value="Sucre">Sucre</option>
          </select>
          <select
            onChange={handleCityChange}
            value={city}
            // disabled={department === ""}
            style={{ "background-color": "black", "color": "white", "flex": "1", "padding": "10px 10px 10px 10px", "border-radius": "0", "-webkit-appearance": "none", "text-align": "center", "margin": "3px" }} >

            <option value="">CIUDAD/MCPIO</option>
            {department === "Atlantico" && (
              <><option key="Barranquilla">Barranquilla</option><option key="Ponedera">Ponedera</option><option key="Malambo">Malambo</option><option key="Soledad">Soledad</option></>
            )}
            {department === "Bolivar" && (
              <><option key="Cartagena">Cartagena</option><option key="Turbaco">Turbaco</option></>
            )}
            {department === "Cordoba" && (
              <><option key="Monteria">Monteria</option><option key="Montelibano">Montelibano</option></>
            )}
            {department === "Cesar" && (
              <><option key="La Paz">La Paz</option><option key="Valledupar">Valledupar</option></>
            )}
            {department === "Guajira" && (
              <><option key="Riohacha">Riohacha</option><option key="Palomino">Palomino</option></>
            )}
            {department === "Magdalena" && (
              <><option key="Rodadero">Rodadero</option><option key="Santa Marta">Santa Marta</option></>
            )}
            {department === "Sucre" && (
              <><option key="Corozal">Corozal</option><option key="Sincelejo">Sincelejo</option></>
            )}
          </select>
        </S.SelectorContainer> */}

        {isLoading && <img style={{ "width": "40px", "align-self": "center", "padding-top": "50px" }} src={spinner} alt="loading..." />}

        {/* {PostsList &&
          (city
            ? PostsList.filter(item => item.location === city).map((post, idx) => (
              <Post
                key={idx}
                icon={getComponentFromString(post.icon)}
                title={post.title}
                description={post.description}
                type={post.type}
                location={post.location}
                time={post.time}
              />
            ))
            : PostsList.map((post, idx) => (
              <Post
                key={idx}
                icon={getComponentFromString(post.icon)}
                title={post.title}
                description={post.description}
                type={post.type}
                location={post.location}
                time={intlFormatDistance(new Date(post.createdAt), new Date(), { addSuffix: true, locale:'es' })}
              />
            )))} */}

{ filteredPosts.map((post, idx) => (
              <CustomPost
                key={idx}
                post={post}
                icon={getComponentFromString(post.icon)}
                title={post.title}
                description={post.description}
                type={post.type}
                location={post.location}
                time={intlFormatDistance(new Date(post.createdAt), new Date(), { addSuffix: true, locale:'es' })}
              />
            ))
            }

      </header>
    </div>
  );
}

export default App;
