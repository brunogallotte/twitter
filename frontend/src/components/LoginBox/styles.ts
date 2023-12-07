import { styled } from 'styled-components'
import { colors, fontSize } from '../../styles'

export const FormControl = styled.form`
    height: 100vh;
    width: 350px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const BoxForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    width: 100%;
    background-color: ${colors.purpleDark};
    color: ${colors.white};
    border-radius: 8px;

    h1 {
        margin-bottom: 32px;
    }

    input {
        padding: 8px;
        margin-bottom: 16px;
        font-size: ${fontSize.small};

        &:focus {
            outline: none;
        }
    }

    button {
        margin-top: 8px;
        height: 40px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-size: ${fontSize.medium};
        width: 50%;
        background-color: ${colors.purpleLight};
        color: ${colors.white};
        font-weight: bold;
        transition: .2s ease-in;

        &:hover {
            background-color: ${colors.purpleHover};
        }
    }

    span {
        margin-top: 16px;
        font-weight: bold;
        cursor: pointer;
        text-decoration: underline;
    }
`