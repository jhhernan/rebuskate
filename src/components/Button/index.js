import React from 'react'
// import { Container } from './ButtonElements'
import * as S from './styled';

const Button = ({ title, type, disabled=false, onClick }) => {
    return (
        <S.Container
            disabled={disabled}
            type={type}
            onClick={onClick}
        >
            {title}
        </S.Container>
    )
}

export default Button