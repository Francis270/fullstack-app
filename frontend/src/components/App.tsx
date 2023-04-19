import { BrowserRouter, Routes , Route } from 'react-router-dom'
import React from 'react'

import useAuthStore from './features/auth/store'
import LogIn from './features/auth/Login'
import Home from './pages/Home'

const App = () => {
    const authStore = useAuthStore()

    if (!authStore.token) {
        return <LogIn />
    }
    return (
        <BrowserRouter>
            <div id="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App