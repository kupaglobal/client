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
}