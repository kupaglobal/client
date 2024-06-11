import httpClient from "../utils/httpClient";

export default class OrganisationService {
    static createOrganisation(createOrganisationData) {
        return httpClient.post('/organisations', createOrganisationData)
    }
    static updateOrganisation(editOrganisationData) {
        return httpClient.patch(`/organisations/${editOrganisationData.id}`, editOrganisationData)
    }
    static async getMyOrganisation() {
        const {data} = await httpClient.get('/auth/profile')
        return data.organisation || null
    }
    static sendInvitation(inviteMemberData) {
        return httpClient.post('/invitations', inviteMemberData)
    }
    static getOrganisationMembers() {
        return httpClient.get('/organisation-members')
    }
    static getRoles() {
        return httpClient.get('/auth/user-roles')
    }
    static acceptInvitation(invitationId) {
        return httpClient.patch(`/invitations/${invitationId}/ACCEPTED`)
    }
    static getInvitationById(invitationId) {
        return httpClient.get(`/invitations/${invitationId}`)
    } 
}