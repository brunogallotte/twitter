import React from "react";
import { TweetContent } from "./styles";

export interface TweetData {
    id?: number;
    user: string;
    content: string;
    created_at: string;
}

const Tweet: React.FC<TweetData> = ({ user, content, created_at }) => {

    const formatCreatedAt = () => {
        const publishedIn = created_at

        return publishedIn.substring(0, 10);
    }


    return (
        <TweetContent>
            <h4>@{user}</h4>
            <p>{content}</p>
            <span>{formatCreatedAt()}</span>
        </TweetContent>
    )
}

export default Tweet;