import { styled } from 'styled-components'

export const FeedBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    padding-top: 32px;
`

export const BoxTweet = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    .teste {
        background-color: #212121;
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 32px;

        textarea {
            width: 100%;
        }
    }

    h2 {
        font-size: 24px;
        color: #fff;
        margin-left: 4px;
    }

    .verticalLine {
        border-left: solid 4px #1b004b;
    }

    textarea {
        resize: none;
        margin-top: 16px;
        height: 60px;
        border: solid 1px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        background-color: #3c3c3c;
        color: #fff;
        padding: 8px;

        &:focus {
            outline: none;
        }
    }

    .boxButton {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    button {
        margin-top: 16px;
    }
`

export const UsersBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 64px;
    max-width: 200px;
    
    h3 {
        font-size: 28px;
        color: #fff;
        margin-left: 4px;
    }

    ul {
        background-color: #1b004b;
        margin-top: 16px;
        padding: 16px;

        li {
            list-style: none;
            margin-bottom: 8px;
            color: #cb6ff9;
        }
    }

    .verticalLine {
        border-left: solid 4px #1b004b;
    }
`