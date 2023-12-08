import { styled } from 'styled-components'
import { breakpoints, colors, fontSize } from '../../styles'

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
`

export const ModalContent = styled.div`
    @keyframes up {
        to {
            scale: 100%;
        } from {
            scale: 70%;
        }
    }

    position: relative;
    display: flex;
    width: 40%;
    height: 10%;
    padding: 32px;
    background-color: ${colors.darkGrey};
    color: ${colors.lightGrey};
    z-index: 1;
    border-bottom: 3px solid ${colors.darkRed};
    justify-content: space-between;
    align-items: center;
    animation: up .4s ease-in-out;

    @media (max-width: ${breakpoints.desktoplg}) {
        width: 80%;
        height: 20%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

    h4 {
        font-size: ${fontSize.big};

        @media (max-width: ${breakpoints.desktoplg}) {
            margin-bottom: 8px;
          }
    }

    p {
        font-sie: ${fontSize.medium};
        color: #ccc;
        opacity: 0.8;
    }

    .header {
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 12px;
        margin-right: 12px;
        font-weight: bold;
        cursor: pointer;
    }
`