import httpClient from "../utils/httpClient";

export class AssessmentsService {
    static getAssessments() {
        return httpClient.get('/assessments')
    }

    static getAssessmentById(assessmentId) {
        return httpClient.get(`/assessments/${assessmentId}`)
    }

    static getAssessmentResultsById(assessmentId, filterOptions = {}) {
        let params = {
            assessmentId,
            ...filterOptions
        }
        Object.keys(params).forEach(key => {
            if (params[key]=="") {
                delete params[key]
            }
        })
        console.log('params', params)
        return httpClient.get('/assessment-results', {
            params
        })
    }

    static createAssessments(newAssessment) {
        return httpClient.post('/assessments', newAssessment)
    }

    static async downloadAssessmentTemplate(assessment, studentIds = [], groupId= null) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await httpClient.post(`/assessments/${assessment.id}/results-template`, {
                    studentIds,
                    groupId
                }, {
                    headers: { 
                        'Accept': 'text/csv',
                    }
                });
        
                const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Kupa_Global_Assessment_Results_Template_${assessment.name.replace(/ /g, '_')}.csv`);
                document.body.appendChild(link);
                link.click();
                return resolve();
            } catch (e) {
                let error = e.response?.data?.message ? e.response?.data?.message : e.message
                reject(error)
            }
        })
    }
}