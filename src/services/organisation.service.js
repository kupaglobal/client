import httpClient, { generateHeaders } from "../utils/httpClient";

export default class OrganisationService {
    static createOrganisation() {
        return httpClient.post('/organisations', {}, { headers: generateHeaders() })
    }
    static async getMyOrganisation() {
        const {data} = await httpClient.post('/auth/profile', {}, { headers: generateHeaders() })
        return data.organisation || null
    }
}