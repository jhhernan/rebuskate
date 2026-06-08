import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    width: min(calc(100% - 32px), 420px);
    margin: 0 auto 32px;
    box-sizing: border-box;
    border: 1px solid #d9e0e8;
    border-radius: 8px;
    background: #fff;
    padding: 22px 18px;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
`

export const FormTitle = styled.h2`
    margin: 0 0 4px;
    text-align: left;
    color: #17212b;
    font-size: 1.35rem;
    line-height: 1.2;
    font-weight: 850;
`
