import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { intlFormatDistance, formatRelative, subDays } from 'date-fns';
import './App.css';
import * as S from './styled';
import mail from './img/mail.png';
import service_icon from './img/service_icon.png';
import drill_icon from './img/drill_icon.png';
import spinner from './img/spinner.gif';

import useRefreshToken from './hooks/useRefreshToken';

import useAxiosPrivate from './hooks/useAxiosPrivate';

import Post from './components/PostModificar'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Menu from './components/Menu';
import SignedOutMenu from './components/SignedOutMenu';


  
function App() {

  const { id } = useParams();


  const [PostsList, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
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
        const response = await axiosPrivate.get(process.env.REACT_APP_BACKEND_SERVER + '/posts/' + id, {
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



  return (
    <div className="App">
      <header className="App-header">
        <S.Menu>
          {auth ? <Menu /> : <SignedOutMenu />}
        </S.Menu>
        <S.Title>rebuscate<span style={{ "color": "black" }}>.com</span></S.Title>

        <S.Description>Revisa esta oportunidad:</S.Description>



        {isLoading && <img style={{ "width": "40px", "align-self": "center", "padding-top": "50px" }} src={spinner} alt="loading..." />}


{ filteredPosts.map((post, idx) => (
              <Post
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
