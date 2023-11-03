import httpClient, { generateHeaders } from "../utils/httpClient";

export class AuthService {
    static login(loginData) {
        return httpClient.post('/auth/login', loginData);
    }

    static signup(signupData) {
        return httpClient.post('/auth/signup', signupData);
    }
    static resendEmailVerification() {
        return httpClient.post('/auth/resend-email-verification', {}, { headers: generateHeaders() });
    }
    static resetPassword(resetPasswordData) {
        return httpClient.post('/auth/reset-password', resetPasswordData);
    }
    static changePassword(changePasswordData) {
        return httpClient.post('/auth/change-password', changePasswordData);
    }
    static verifyEmail(verifyEmailData) {
        return httpClient.post('/auth/verify-email', verifyEmailData, { headers: generateHeaders() });
    }
    static upsertProfile(upsertProfileDto) {
        return httpClient.post('/auth/profile', upsertProfileDto, { headers: generateHeaders() })
    }
    static getProfile() {
        return httpClient.get('/auth/profile')
    }
}