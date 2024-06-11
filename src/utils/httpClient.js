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

export const baseURL = getEnv('BASE_URL','https://sapi.kupaglobal.com')

const instance = axios.create({
    baseURL,
})

instance.interceptors.request.use(function(request) {
    console.log('requesting')
    request.headers = generateHeaders()
    return request
})

instance.interceptors.response.use((response) => (response), (error) => {
    if (error.response.status === 403 && error.config.url.indexOf('/invitations/') === -1) {
        window.localStorage.clear();
        return window.location.href = '/auth/login'
    }
    throw error;
})

export default instance;