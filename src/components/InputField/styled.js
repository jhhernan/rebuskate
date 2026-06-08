import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const Input = styled.input`
    width: 100%;
    min-height: 48px;
    padding: 0 1rem;
    border: 1px solid #d9e0e8;
    border-radius: 8px;
    background: #fff;
    color: #17212b;
    font-size: 1rem;
    outline: none;

    &:focus {
        border-color: #0f766e;
        box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.14);
    }

    &:not(:placeholder-shown) + span,
    &:focus + span {
        color: #0f766e;
        transform: translateX(10px) translateY(-24px);
        font-size: 0.75rem;
        font-weight: 750;
        padding: 0 6px;
        background-color: #fff;
    }

    &:not(:focus) + span {
        color: #808080;
    }
`

export const Label = styled.span`   
    position: absolute;
    left: 0;
    padding-left: 1rem;
    font-size: 1rem;
    color: #64748b;
    pointer-events: none;
    transition: 160ms ease;
`
