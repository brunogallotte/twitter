import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import Button from "../Button"
import { BoxTweet, FeedBox, UsersBox } from "./styles"
import Tweet, { TweetData } from "../Tweet"
import { RingLoader } from "react-spinners"
import { LoadingContainer } from "../Tweet/styles"
import { ModalState } from "../LoginBox"
import Modal from "../Modal"

interface UsersResponse {
    count: number
    next: null | string
    previus: null | string
    results: UserData[]
}

interface UserData {
    email: string
    password?: string
    tweets: []
    url: string
    username: string
}

const Feed = () => {
    const [data, setData] = useState<{ results: TweetData[] }>({ results: [] })
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'))
    const [users, setUsers] = useState<UsersResponse | null>(null)
    const [tweetContent, setTweetContent] = useState({content: ''})
    const [showModal, setShowModal] = useState<ModalState>({isVisible: false, title: '', description: ''})

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://brunogallotte.pythonanywhere.com/tweets/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                })

                if (!response.ok) {
                    if (response.status === 401) {
                        await renewAccessToken();
                        handleShowModal('Erro', 'Você precista estar logado para visualizar os tweets!')

                        // Após renovar, tenta novamente a requisição original

                        
                        const retryResponse = await fetch('https://brunogallotte.pythonanywhere.com/tweets/', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        })

                        if (retryResponse.ok) {
                            const jsonData: TweetData[] = await retryResponse.json();
                            setData({ results: jsonData });;
                        } else {
                            throw new Error('Network response was not ok after token renewal');
                        }
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }

                const jsonData = await response.json();
                setData(jsonData);
                
                // Request Users
                const responseUser = await fetch('https://brunogallotte.pythonanywhere.com/users/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                })
                if (responseUser.ok) {
                    const usersData: UsersResponse = await responseUser.json()

                    setUsers(usersData)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Renovar token de acesso [refresh]
        const renewAccessToken = async () => {
            try {
                const renewResponse = await fetch('https://brunogallotte.pythonanywhere.com/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refresh: refreshToken,
                    }),
                })

                if (!renewResponse.ok) {
                    throw new Error('Erro ao renovar token');
                }

                const renewedTokens = await renewResponse.json();

                // Atualiza o estado ou armazenamento local com os novos tokens
                setAccessToken(renewedTokens.access);
                setRefreshToken(renewedTokens.refresh);

            } catch (error) {
                console.error('Error renewing access token:', error);

                // Limpar os tokens de acesso e atualização
                setAccessToken(null);
                setRefreshToken(null);
            }
        };

        fetchData();
    }, [accessToken, refreshToken]);

    const handleTweetChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTweetContent({content: event.target.value})
    }

    const handlePostTweet = async () => {
        try {
            const response = await fetch('https://brunogallotte.pythonanywhere.com/tweets/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(tweetContent)
            });
    
            if (!response.ok) {
                alert('Falha ao tentar fazer o tweet!')
                throw new Error('Network response was not ok');
            }
    
            window.location.reload()
    
        } catch (error) {
            console.error('Error posting tweet:', error);
        }
    }

    const handleShowModal = (title: string, description: string): void => {
        setShowModal({isVisible: true, title: title, description: description})
    }

    const handleCloseModal = () => {
        setShowModal({isVisible: false, title: '', description: ''})
        
        if (location.pathname === '/home') {
            navigate('/')
        }
    }

    return (
        <>
            <FeedBox className="container">
                <BoxTweet>
                    <div className="boxGrey">
                        <h2>Express yourself</h2>
                        <textarea value={tweetContent.content} onChange={handleTweetChange} placeholder="write your tweet here!"/>
                        <div className="boxButton">
                            <Button onClick={handlePostTweet}>Tweet</Button>
                        </div>
                    </div>
                    <div className="verticalLine">
                        <h2>Feed</h2>
                    </div>
                    <div>
                    {Array.isArray(data.results) && data.results.length > 0 ? (
                            data.results.slice().reverse().map((tweet, index) => (
                                <Tweet key={index} user={tweet.user} content={tweet.content} created_at={tweet.created_at} />
                            ))
                        ) : (
                            <LoadingContainer>
                                <RingLoader color="rgba(39, 0, 86, 1)" />
                            </LoadingContainer>
                        )}
                    </div>
                </BoxTweet>
                <UsersBox>
                    <div className="verticalLine">
                        <h3>Users</h3>
                    </div>
                    {users?.results && Array.isArray(users?.results) && users?.results.length > 0 ? (
                        <ul>
                            {users?.results.map((user, index) => (
                                <li key={index}>
                                    @{user.username}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <LoadingContainer>
                            <RingLoader color="rgba(39, 0, 86, 1)" />
                        </LoadingContainer>
                    )}
                </UsersBox>
            </FeedBox>
            {showModal.isVisible ? <Modal handleShowModal={handleShowModal} handleCloseModal={handleCloseModal} title={showModal.title} description={showModal.description} /> : null}
        </>
    )
}

export default Feed