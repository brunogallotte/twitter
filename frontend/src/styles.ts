import { createGlobalStyle } from "styled-components"

export const colors = {
    white: '#fff',
    purpleDark: '#240046',
    purpleLight: '#573b8a',
    purpleHover: '#6d44b8',
    purpleBackground: '#B290EA',
    darkGrey: '#212121',
    lightGrey: '#3c3c3c',
    darkRed: '#800000'
}

export const fontSize = {
    small: '14px',
    medium: '18px',
    big: '24px',
    veryBig: '32px'
}

export const breakpoints = {
    desktoplg: '1220px',
    desktop: '1024px',
    tablet: '767px'
  }

export const GlobalCss = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
    }

    body {
        background-color: ${colors.purpleBackground}
    }

    .container {
        max-width: 1024px;
        width: 100%;
        margin: 0 auto;

        @media (max-width: ${breakpoints.desktop}) {
            max-width: 80%;
          }
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: ${colors.purpleLight};
    }
`
