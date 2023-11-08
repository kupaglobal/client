import httpClient from "../utils/httpClient";

export class TemplatesService {
    static getTemplates() {
        return httpClient.get('/templates')
    }

    static getTemplateById(templateId) {
        return httpClient.get(`/templates/${templateId}`)
    }

    static createTemplate(data) {
        return httpClient.post('/templates', data)
    }

    static downloadTemplate(template) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await httpClient.post(`/templates/${template.id}/download`, {}, {
                    headers: { 
                        'Accept': 'text/csv',
                    },
                    responseType: 'blob'
                });

                const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Kupa_Global_Template_${template.name.replace(/ /g, '_')}.csv`);
                document.body.appendChild(link);
                link.click();
                resolve();
            } catch (e) {
                reject(e)
            }
        })
    }

    static uploadTemplate(template, file) {
        return new Promise(async (resolve, reject) => {
            try {
                var formData = new FormData();
                formData.append("file", file);
                const res = await httpClient.post(`/templates/${template.id}/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                console.log('in service', res)

                resolve();
            } catch (e) {
                reject(e)
            }
        })
    }
}