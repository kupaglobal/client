import httpClient from "../utils/httpClient";

export class DashboardService {
    static getStudentsGenderYTD() {
        return httpClient.get('/dashboard/gender-ytd')
    }
    static getStudentsAgeYTD() {
        return httpClient.get('/dashboard/age')
    }

}