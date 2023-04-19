import useAuthStore from './store'

type LogoutProps = {
}

const Logout = (props: LogoutProps) => {
    const authStore = useAuthStore()

    return (
        <div id="Logout">
            <button className="login-btn" onClick={ () => { authStore.setToken('') } }>Logout</button>
        </div>
    )
}

export default Logout