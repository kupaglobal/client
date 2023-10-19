import httpClient, { generateHeaders } from "../utils/httpClient";

export default class OrganisationService {
    static createOrganisation(createOrganisationData) {
        return httpClient.post('/organisations', createOrganisationData, { headers: generateHeaders() })
    }
    static async getMyOrganisation() {
        const {data} = await httpClient.post('/auth/profile', {}, { headers: generateHeaders() })
        return data.organisation || null
    }
    static async sendInvitation(inviteMemberData) {
        return httpClient.post('/organisations/invitation', inviteMemberData, { headers: generateHeaders() })
    }
}