import { create } from 'zustand'

const tokenStorageKey = 'token'
const token = localStorage.getItem(tokenStorageKey)

type AuthStore = {
    token:      string,
    setToken:   (newtoken: string) => void
}

const useAuthStore = create<AuthStore>((set) => ({
    token: token || '',
    setToken: (newtoken: string) =>{
        if (newtoken !== '') {
            localStorage.setItem(tokenStorageKey, newtoken)
        } else {
            localStorage.removeItem(tokenStorageKey)
        }
        set(() => ({
            token: newtoken
        }))
    }
}))

export default useAuthStore