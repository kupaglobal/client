import httpClient from "../utils/httpClient";

export class TagsService {
    static getTags() {
        return httpClient.get('/tags')
    }

    static createTag(newTag) {
        return httpClient.post('/tags', newTag)
    }

    static addStudentsToTag(studentIds, tagId) {
        return httpClient.post(`/tags/${tagId}/students`, {
            studentIds
        })
    }

    static deleteTag(tagId) {
        return httpClient.delete(`/tags/${tagId}`)
    }

    static editTag(tagId, editTagData) {
        return httpClient.patch(`/tags/${tagId}`, editTagData)
    }
}