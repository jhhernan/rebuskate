import React from 'react'
// import { FormContainer, FormTitle } from './FormElements';
import * as S from './styled';


const Form = ({ showTitle=true, title='Registrate', children }) => {
    return (
        <S.FormContainer>
            {showTitle && <S.FormTitle> {title} </S.FormTitle>}
            {children}
        </S.FormContainer>
    )
}

export default Form;