import { styled } from 'styled-components'

export const FormControl = styled.form`
    height: 100vh;
    width: 350px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const BoxLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    width: 100%;
    background-color: #240046;
    color: #fff;
    border-radius: 8px;

    h1 {
        margin-bottom: 32px;
    }

    input {
        padding: 8px;
        margin-bottom: 16px;
    }

    button {
        margin-top: 8px;
        height: 40px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        width: 50%;
        background-color: #573b8a;
        color: #fff;
        font-weight: bold;
        transition: .2s ease-in;

        &:hover {
            background-color: #6d44b8;
        }
    }
`