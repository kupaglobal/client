import httpClient from "../utils/httpClient";

export class ReportsService {
    static getStats(filterOptions) {
        let params = {
            ...filterOptions
        }
        Object.keys(params).forEach(key => {
            if (params[key] && params[key]==="") {
                delete params[key]
            }
        })
        return httpClient.get('/reports/stats', { 
            params
        })
    }

    static getCohortCosts(filterOptions) {
        let params = {
            ...filterOptions
        }
        Object.keys(params).forEach(key => {
            if (params[key] && params[key]==="") {
                delete params[key]
            }
        })
        return httpClient.get('/reports/cohort-costs', {
            params
        })
    }
}