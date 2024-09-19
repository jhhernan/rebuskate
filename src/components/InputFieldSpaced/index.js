import React from 'react'
// import { InputFieldProps } from '../../types/propTypes'
// import {
//     Container,
//     Input,
//     Label
// } from './InputFieldElements'
import * as S from './styled';


const InputField = ({ label, type, value, onChange}) => {
    return (
        <S.Container>
            <S.Input type={type} placeholder=" " inputMode={type=='numeric' ? 'numeric' : ''} value={value} onChange={onChange} />
            <S.Label> {label} </S.Label>
        </S.Container>
    )
}

export default InputField