import httpClient from "../utils/httpClient";

export class DashboardService {
    static getStudentsGenderYTD() {
        return httpClient.get('/dashboard/gender-ytd')
    }
    static getStudentsAgeYTD() {
        return httpClient.get('/dashboard/age')
    }
    static getReminders() {
        return httpClient.get('/todos')
    }
    static addReminder(reminderDto) {
        return httpClient.post('/todos', reminderDto)
    }
    static updateReminder(reminderId, reminderDto) {
        return httpClient.patch(`/todos/${reminderId}`, reminderDto)
    }
    static deleteReminder(reminderId) {
        return httpClient.delete(`/todos/${reminderId}`)
    }
    static getTopPerformers() {
        return httpClient.get(`/dashboard/top-performers`)
    }
}