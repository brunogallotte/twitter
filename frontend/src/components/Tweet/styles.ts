import { styled } from 'styled-components'

export const TweetContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    background-color: #1b004b;
    border-radius: 4px;
    padding: 16px;
    color: #cb6ff9;
    margin-top: 32px;

    h4 {
        font-size: 22px;
        margin-bottom: 8px;
    }

    p {
        margin-bottom: 8px;
    }
`

export const LoadingContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 32px;
`