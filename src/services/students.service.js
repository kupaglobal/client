import httpClient from "../utils/httpClient";

export class StudentsService {
    static getStudentFields() {
        return httpClient.get('/students/student-fields')
    }

    static getStudents(filterOptions = {}) {
        let params = {
            ...filterOptions
        }
        Object.keys(params).forEach(key => {
            if (params[key] && params[key]==="") {
                delete params[key]
            }
        })

        let url = '/students'
        
        if (params['cohortId']) {
            url = `/cohorts/${params['cohortId']}/students`
            delete params['cohortId']
        }

        return httpClient.get(url, {
            params
        })
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

    static getStudentPortfolio(studentId) {
        return httpClient.get(`/students/${studentId}/portfolio`)
    }

    static addStudentPortfolioItem(studentId, studentPortfolioItemDto) {
        return httpClient.post(`/students/${studentId}/portfolio`, studentPortfolioItemDto)
    }

    static editStudentPortfolioItem(studentId, portfolioId, studentPortfolioItemDto) {
        delete studentPortfolioItemDto.id
        return httpClient.put(`/students/${studentId}/portfolio/${portfolioId}`, studentPortfolioItemDto)
    }

    static editStudentAchievementItem(studentId, achievementId, studentAchievementItemDto) {
        delete studentAchievementItemDto.id
        return httpClient.put(`/students/${studentId}/achievements/${achievementId}`, studentAchievementItemDto)
    }

    static updateStudentDetails(studentId, updateStudentDetailsDto) {
        return httpClient.put(`/students/${studentId}`, updateStudentDetailsDto)
    }
}