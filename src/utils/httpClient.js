import axios from "axios"

const generateHeaders = () => {
    const jwtToken = localStorage.getItem('jwtToken') || null
    let headers = {
        'accept': 'application/json'
    }
    if (jwtToken) {
        headers['authorization'] = `Bearer ${jwtToken}`
    }
}

const baseURL = process.env.BASE_URL ? process.env.BASE_URL : 'https://sapi.kupaglobal.com'

export default axios.create({
    baseURL,
    headers: generateHeaders()
})