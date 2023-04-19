import { useQuery, UseQueryResult } from 'react-query'

import { getToken, MessageResponse } from './queries'
import { useInput } from '../hooks/useInput'
import Loading from '../loading/Loading'
import useAuthStore from './store'

import './login.scss'

type LoginProps = {
}

const Login = (props: LoginProps) => {
    const authStore = useAuthStore()
    const [username, userInput] = useInput({ type: 'text', class: 'signup-username' })
    const [password, passwordInput] = useInput({ type: 'password', class: 'signup-password' })
    const { isLoading, refetch }: UseQueryResult<MessageResponse, Error> = useQuery(
        ['token-query', { username: username as string, password: password as string }], getToken, {
            enabled: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 0,
            onSuccess: (data) => {
                authStore.setToken(`Bearer ${data}`)
            }
        }
    )

    return (
        <div id="Login">
            <Loading show={ isLoading } />
            <div className="login-container">
                <div className="login-fields">
                    <div className="login-username">Username <br /> { userInput }</div>
                    <div className="login-password">Password <br /> { passwordInput }</div>
                </div>
                <button className="login-btn" onClick={ () => { refetch() } }>Login</button>
            </div>
        </div>
    )
}

export default Login