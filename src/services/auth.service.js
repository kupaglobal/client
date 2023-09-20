import httpClient from "../utils/httpClient";

export class AuthService {
    static signup(signupData) {
        return httpClient.post('/auth/signup', signupData);
    }
}