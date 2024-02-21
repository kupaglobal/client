import httpClient from "../utils/httpClient";

export class CohortsService {
    static getCohorts() {
        return httpClient.get('/cohorts')
    }

    static createCohort(newCohort) {
        return httpClient.post('/cohorts', newCohort)
    }

    static editCohort(cohortId, editCohortData) {
        return httpClient.put(`/cohorts/${cohortId}`, editCohortData)
    }

    static deleteCohort(cohortId) {
        return httpClient.delete(`/cohorts/${cohortId}`)
    }

    static addStudentsToCohort(studentIds, cohortId) {
        return httpClient.post(`/cohorts/${cohortId}/students`, {
            studentIds
        })
    }

}