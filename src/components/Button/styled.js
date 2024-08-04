import styled from 'styled-components'

export const Container = styled.button`
    border: none;
    // background-color: #24a0ed;
    background-color: red;
    color: #fff;
    font-size: 0.9rem;
    // width: 100%;

    // Para hacer el boton mas pequeño respecto a los campos 
    margin-left: 25%;
    margin-right: 25%;

    padding: 0.8rem;
    cursor: pointer;
    transition: all 0.5s;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);

    &:hover {
        background-color: #707070;
    }
`