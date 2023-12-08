import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { RingLoader } from "react-spinners"

import Button from "../Button"
import { ModalState } from "../LoginBox"
import Modal from "../Modal"

import { LoadingContainer } from "../Tweet/styles"
import Tweet, { TweetData } from "../Tweet"


import * as S from "./styles"

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
                        handleShowModal('Erro', 'Você precisa estar logado para visualizar os tweets!')
                        setAccessToken(null)
                    
                        const retryResponse = await fetch('https://brunogallotte.pythonanywhere.com/tweets/', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        })

                        if (retryResponse.ok) {
                            const jsonData: TweetData[] = await retryResponse.json();
                            setData({ results: jsonData })
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

        fetchData();
    }, [accessToken])

    const handleTweetChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTweetContent({content: event.target.value})
    }

    const handlePostTweet = async () => {
        if (tweetContent.content.length > 30 && tweetContent.content.length < 200) {

            try {
                const response = await fetch('https://brunogallotte.pythonanywhere.com/tweets/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(tweetContent)
                })
        
                if (!response.ok) {
                    alert('Falha ao tentar fazer o tweet!')
                    throw new Error('Network response was not ok')
                }
        
                window.location.reload()
        
            } catch (error) {
                console.error('Error posting tweet:', error)
            }
        } else if (tweetContent.content.length < 30) {
            handleShowModal('Erro', 'O tweet deve conter pelo menos 30 caracteres')
        } else if (tweetContent.content.length > 200) {
            handleShowModal('Erro', 'O tweet não pode exceder os 200 caracteres')
        }
    }

    const handleShowModal = (title: string, description: string): void => {
        setShowModal({isVisible: true, title: title, description: description})
    }

    const handleCloseModal = () => {
        setShowModal({isVisible: false, title: '', description: ''})
        
        if (location.pathname === '/home' && !accessToken) {
            navigate('/')
        }
    }

    return (
        <>
            <S.FeedBox className="container">
                <S.BoxTweet>
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
                </S.BoxTweet>
                <S.UsersBox>
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
                </S.UsersBox>
            </S.FeedBox>
            {showModal.isVisible ? <Modal handleShowModal={handleShowModal} handleCloseModal={handleCloseModal} title={showModal.title} description={showModal.description} /> : null}
        </>
    )
}

export default Feed