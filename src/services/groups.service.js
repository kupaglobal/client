import httpClient from "../utils/httpClient";

export class GroupsService {
    static getGroups() {
        return httpClient.get('/groups')
    }

    static createGroup(newGroup) {
        return httpClient.post('/groups', newGroup)
    }

    static addStudentsToGroup(studentIds, groupId) {
        return httpClient.post(`/groups/${groupId}/students`, {
            studentIds
        })
    }

    static deleteGroup(groupId) {
        return httpClient.delete(`/groups/${groupId}`)
    }

    static editCohort(cohortId, editCohortData) {
        return httpClient.patch(`/cohorts/${cohortId}`, editCohortData)
    }

}