import { styled } from 'styled-components'
import { colors, fontSize } from '../../styles'

export const ButtonStyle = styled.button`
    background-color: ${colors.purpleLight};
    padding: 12px;
    width: 90px;
    border: none;
    border-radius: 8px;
    color: ${colors.white};
    cursor: pointer;
    transition: .2s ease-in;
    font-weight: bold;
    font-size: ${fontSize.small};

    &:hover {
        background-color: ${colors.purpleHover};
    }
`
