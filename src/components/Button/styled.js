import styled from 'styled-components'

export const Container = styled.button`
    width: 100%;
    min-height: 48px;
    border: none;
    background-color: #0f766e;
    color: #fff;
    font-size: 1rem;
    font-weight: 850;
    padding: 0 1rem;
    cursor: pointer;
    transition: background 160ms ease, transform 160ms ease;
    border-radius: 999px;
    outline: none;
    box-shadow: 0 12px 26px rgba(15, 118, 110, 0.24);

    &:hover {
        background-color: #115e59;
        transform: translateY(-1px);
    }
`
