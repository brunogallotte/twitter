import { styled } from 'styled-components'
import { colors, fontSize } from '../../styles'

export const FeedBox = styled.div`
    display: flex;
    padding-top: 32px;
    justify-content: center;
`

export const BoxTweet = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;

    .boxGrey {
        background-color: ${colors.darkGrey};
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 32px;

        textarea {
            width: 100%;
            font-size: ${fontSize.small};
        }
    }

    h2 {
        font-size: ${fontSize.big};
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
    width: 30%;
    
    h3 {
        font-size: ${fontSize.big};
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