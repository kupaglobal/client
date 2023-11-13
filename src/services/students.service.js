import httpClient from "../utils/httpClient";

export class StudentsService {
    static getStudentFields() {
        return httpClient.get('/students/student-fields')
    }

    static getStudents() {
        return httpClient.get('/students')
    }

    static getSingleStudent(studentId) {
        return httpClient.get(`/students/${studentId}`)
    }

    static getStudentAchievements(studentId) {
        return httpClient.get(`/students/${studentId}/achievements`)
    }

    static addStudentAchievement(studentId, studentAchievementDto) {
        return httpClient.post(`/students/${studentId}/achievements`, studentAchievementDto)
    }
}