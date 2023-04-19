import { QueryFunctionContext } from 'react-query'
import axios from 'axios'

const { VITE_API_URL } = import.meta.env

export type Credentials = {
    username: string,
    password: string
}

export type MessageResponse = {
    message: string
}

export const getToken = async (params: QueryFunctionContext<[string, Credentials]>) => {
    const [, { username, password }] = params.queryKey
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        }
    }

    try {
        const resp = await axios.post(`${VITE_API_URL}/user/login`, { username, password }, config)
        
        return resp.data.message as MessageResponse
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}