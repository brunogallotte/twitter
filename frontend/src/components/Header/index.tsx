import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Button from "../Button"

import * as S from "./styles"

const Header = () => {
    const [logout, setLogout] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=> {
        if (location.pathname === '/home') {
            setLogout(true)
        }
    }, [location])

    const handleLogout = () => {
        if (logout) {
            localStorage.setItem('accessToken', '')
            localStorage.setItem('refreshToken', '')

            navigate('/')
        }
    }


    return (
        <S.HeaderBar>
            <S.NavBar className="container">
                <S.Content>
                    <h1>Twitter App</h1>
                    <ul>
                        <li>it's only for fun</li>
                    </ul>
                </S.Content>
                <Button onClick={handleLogout}>{logout ? 'Logout' : 'Login'}</Button>
            </S.NavBar>
        </S.HeaderBar>
    )
}

export default Header