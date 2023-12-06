import React from "react";
import { TweetContent } from "./styles";

export interface TweetData {
    id?: number;
    user: string;
    content: string;
    created_at: string;
}

const Tweet: React.FC<TweetData> = ({ user, content, created_at }) => {
    return (
        <TweetContent>
            <h4>{user}</h4>
            <p>{content}</p>
            <span>{created_at}</span>
        </TweetContent>
    );
};

export default Tweet;