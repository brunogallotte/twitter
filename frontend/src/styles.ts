import { createGlobalStyle } from "styled-components"

export const GlobalCss = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
    }

    body {
        background-color: #B290EA;
    }

    .container {
        max-width: 1024px;
        width: 100%;
        margin: 0 auto;
    }
`
