import React from 'react'
import * as S from './styled';


const ErrorLabel = ({ label }) => {
    return (
        <S.Container>
            <S.Label> {label} </S.Label>
        </S.Container>
    )
}

export default ErrorLabel