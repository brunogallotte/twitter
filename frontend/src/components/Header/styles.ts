import { styled } from 'styled-components'
import { breakpoints, colors, fontSize } from '../../styles'

export const HeaderBar = styled.div`
    background-color: ${colors.purpleDark};
`

export const NavBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.white};
    min-height: 80px;

    ul {
        display: flex;
        margin-left: 32px;

        @media (max-width: ${breakpoints.desktop}) {
            display: none;
          }

        li {
            list-style: none;
            margin-right: 16px;
        }
    }
`

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        @media (max-width: ${breakpoints.desktop}) {
            font-size: ${fontSize.big};
          }
    }
`