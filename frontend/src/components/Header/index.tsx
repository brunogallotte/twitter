import { useLocation, useNavigate } from "react-router-dom"

import Button from "../Button"
import { Content, HeaderBar, NavBar } from "./styles"
import { useEffect, useState } from "react"

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
        <HeaderBar>
            <NavBar className="container">
                <Content>
                    <h1>Twitter App</h1>
                    <ul>
                        <li>it's only for fun</li>
                    </ul>
                </Content>
                <Button onClick={handleLogout}>{logout ? 'Logout' : 'Login'}</Button>
            </NavBar>
        </HeaderBar>
    )
}

export default Header