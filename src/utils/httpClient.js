import axios from "axios"
import { getEnv } from "./env"

export const generateHeaders = () => {
    const jwtToken = () => localStorage.getItem('jwtToken') || null
    let headers = {
        'Accept': 'application/json'
    }
    if (jwtToken()) {
        headers['Authorization'] = `Bearer ${jwtToken()}`
    }
    return headers
}

const baseURL = getEnv('BASE_URL','https://sapi.kupaglobal.com')

const instance = axios.create({
    baseURL,
})

instance.interceptors.request.use(function(request) {
    console.log('requesting')
    request.headers = generateHeaders()
    return request
})

instance.interceptors.response.use((response) => (response), (error) => {
    if (error.response.status === 403) {
        window.localStorage.clear();
        return window.location.href = '/auth/login'
    }
    return error;
})

export default instance;