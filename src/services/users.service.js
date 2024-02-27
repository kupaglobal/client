import httpClient from "../utils/httpClient";

export class UsersService {
    static getUsers(params = {}) {
        Object.keys(params).forEach(key => {
            if (params[key]==="") {
                delete params[key]
            }
        })

        return httpClient.get('/organisation-members', {
            params
        })
    }
}