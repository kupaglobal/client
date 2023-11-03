import axios from "axios"
import { getEnv } from "./env"

export const generateHeaders = () => {
    const jwtToken = localStorage.getItem('jwtToken') || null
    let headers = {
        'Accept': 'application/json'
    }
    if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`
    }
    return headers
}

const baseURL = getEnv('BASE_URL','https://sapi.kupaglobal.com')

export default axios.create({
    baseURL,
    headers: generateHeaders()
})