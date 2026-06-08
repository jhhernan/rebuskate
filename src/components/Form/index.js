import React from 'react'
// import { FormContainer, FormTitle } from './FormElements';
import * as S from './styled';


const Form = ({ showTitle=true, title='Regístrate', children, onSubmit }) => {
    return (
        <S.FormContainer onSubmit={onSubmit}>
            {showTitle && <S.FormTitle> {title} </S.FormTitle>}
            {children}
        </S.FormContainer>
    )
}

export default Form;
