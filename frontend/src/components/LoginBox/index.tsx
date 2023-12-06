import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { BoxForm, FormControl } from "./styles";
import { ClipLoader } from "react-spinners";

type FormState = {
    username: string
    password: string
}

type MailState = {
    email: string
}

const LoginBox = () => {
    const [formState, setFormState] = useState<FormState>({username: '', password: ''})
    const [email, setEmail] = useState<MailState>({email: ''})
    const [showRegister, setShowRegister] = useState(false)
    const [registerData, setRegisterData] = useState({})
    const [isLoading, SetIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            username: event.target.value
        })
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            password: event.target.value,
        })
        }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail({
            email: event.target.value
        })
        }

    const toggleRegisterForm = () => {
        if (showRegister) {
            setShowRegister(false)
        } else {
            setShowRegister(true)
        }
    }

    // Atualiza o register data com os dados de login, password e email
    useEffect(()=> {
        setRegisterData({...formState, ...email})
    }, [formState, email])

    const handlePostLogin = () => {
        SetIsLoading(true)

        fetch('http://brunogallotte.pythonanywhere.com/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        })
        .then(response => response.json())
        .then(data => {
            if (data.access && data.refresh) {
                SetIsLoading(false)

                // Armazena os tokens no armazenamento local
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
    
                alert('Logado com sucesso!');

                 // Limpar os estados
                setFormState({username: '', password: ''})

                // Limpar os campos de input
                document.querySelectorAll('input').forEach(input => (input.value = ''))

                navigate('/home')

            } else {
                alert('Conta não encontrada, clique em registrar-se.');
                SetIsLoading(false)
            }
        })
        .catch(error => {
            alert('Erro ao tentar fazer login. Verifique sua conexão com a internet.');
            console.error(error.message);
        })
    }

    const handlePostRegister = () => {
        fetch('http://brunogallotte.pythonanywhere.com/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        })
        .then(response => {
            if(response.ok) {
                alert('Usuário registrado!')

                // Limpar os campos de registro
                document.querySelectorAll('input').forEach(input => (input.value = ''))

                // Retornar ao login
                setShowRegister(true)

                // Navegar para home
                navigate('/home')
            } else {
                alert('Erro ao se cadastrar!')
            }
        })
        .catch(error => {
            alert('Erro ao tentar se registrar. Verifique sua conexão com a internet.');
            console.error(error.message);
        })
    }

    return (
        <FormControl>
            {showRegister ? 
            (<BoxForm>
                <h1>Register</h1>
                <input type="text" placeholder="username" onChange={handleUsernameChange} required />
                <input type="password" placeholder="password" onChange={handlePasswordChange} required/>
                <input type="email" placeholder="email" onChange={handleEmailChange} required/>
                <button type="button" onClick={handlePostRegister}>Register</button>
                <span onClick={toggleRegisterForm}>Log in</span>
            </BoxForm>) : (<BoxForm>
                <h1>Log in</h1>
                <input type="text" placeholder="username" onChange={handleUsernameChange} required />
                <input type="password" placeholder="password" onChange={handlePasswordChange} required/>
                {!isLoading ? (<button type="button" onClick={handlePostLogin}>Log in</button>) : <ClipLoader color="#ffffff" />}
                <span onClick={toggleRegisterForm}>Register-me</span>
            </BoxForm>)}
        </FormControl>
    )
}

export default LoginBox;
