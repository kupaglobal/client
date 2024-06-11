import axios from "axios";
import httpClient, { baseURL, generateHeaders } from "../utils/httpClient";

export class CohortsService {
    static getCohorts() {
        return httpClient.get('/cohorts')
    }

    static getCohort(cohortId) {
        return httpClient.get(`/cohorts/${cohortId}`)
    }

    static createCohort(newCohort) {
        return httpClient.post('/cohorts', newCohort)
    }

    static editCohort(cohortId, editCohortData) {
        return httpClient.put(`/cohorts/${cohortId}`, editCohortData)
    }

    static addFacilitatorsToCohort(cohortId, facilitatorIds) {
        return httpClient.post(`/cohorts/${cohortId}/tag`, facilitatorIds)
    }

    static deleteCohort(cohortId) {
        return httpClient.delete(`/cohorts/${cohortId}`)
    }

    static addStudentsToCohort(studentIds, cohortId) {
        return httpClient.post(`/cohorts/${cohortId}/students`, {
            studentIds
        })
    }

    static removeStudentsFromCohort(studentIDs, cohortId) {
        return axios.delete(`${baseURL}/cohorts/${cohortId}/students`, {
            data: {
                studentIDs
            },
            headers: generateHeaders()
        })
    }

}