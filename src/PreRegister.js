import { Link } from 'react-router-dom';

import './App.css';
import * as S from './styled';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';


function Register() {
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
          </S.TopBar>

          <S.Hero>
            <S.HeroKicker><PersonAddIcon fontSize="small" /> Crear cuenta</S.HeroKicker>
            <S.HeroTitle>Regístrate.</S.HeroTitle>
            <S.HeroText>Elige como quieres usar rebuscate.com para crear el tipo de perfil correcto desde el inicio.</S.HeroText>
          </S.Hero>

          <S.SectionHeader>
            <S.SectionTitle>¿Qué quieres hacer?</S.SectionTitle>
            <S.ResultCount>2 opciones</S.ResultCount>
          </S.SectionHeader>

          <S.FeedGrid>
            <Link to="/lightregister" style={{ textDecoration: 'none' }}>
              <S.PostContainer>
                <S.JobCardTop>
                  <S.JobAvatar><AddCircleOutlineIcon fontSize="small" /></S.JobAvatar>
                  <S.JobMain>
                    <S.PostType>Publicar anuncio</S.PostType>
                    <S.PostTitle isVisible={true}>Quiero publicar un anuncio o servicio que necesito.</S.PostTitle>
                    <S.JobMetaRow>
                      <S.JobMeta>Crear cuenta para publicar</S.JobMeta>
                    </S.JobMetaRow>
                  </S.JobMain>
                </S.JobCardTop>
              </S.PostContainer>
            </Link>

            <Link to="/registerexpert" style={{ textDecoration: 'none' }}>
              <S.PostContainer>
                <S.JobCardTop>
                  <S.JobAvatar><WorkOutlineIcon fontSize="small" /></S.JobAvatar>
                  <S.JobMain>
                    <S.PostType>Buscar trabajo</S.PostType>
                    <S.PostTitle isVisible={true}>Quiero rebuscarme y ofrecer mi oficio o experiencia.</S.PostTitle>
                    <S.JobMetaRow>
                      <S.JobMeta>Crear perfil de trabajador</S.JobMeta>
                    </S.JobMetaRow>
                  </S.JobMain>
                </S.JobCardTop>
              </S.PostContainer>
            </Link>
          </S.FeedGrid>

          <S.Description style={{ paddingTop: '24px' }}>
            Ya tienes usuario? <Link to="/login">Ingresa aquí</Link>
          </S.Description>
        </S.AppShell>
      </header>
    </div>
  );

}

export default Register;
