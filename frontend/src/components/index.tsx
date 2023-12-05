import { ChangeEvent, useEffect, useState } from "react";
import { BoxLogin, FormControl } from "./styles";

type FormState = {
    username: string
    password: string
}

const LoginBox = () => {
    const [formState, setFormState] = useState<FormState>({username: '', password: ''})

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

    const handlePostRequest = () => {
        fetch('http://brunogallotte.pythonanywhere.com/login/', {
            mode: 'no-cors',    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState)
        }).then(data => {
            alert('Logado com sucesso!')
        }).catch(error => {
            alert('Usuario não encontrado!')
            console.log(error.message)
        })

        console.log(formState)
    }

    return (
        <FormControl>
            <BoxLogin>
                <h1>Log in</h1>
                <input type="text" placeholder="username" onChange={handleUsernameChange} required />
                <input type="password" placeholder="password" onChange={handlePasswordChange} required/>
                <button type="button" onClick={handlePostRequest}>Log in</button>
            </BoxLogin>
        </FormControl>
    )
}

export default LoginBox;
