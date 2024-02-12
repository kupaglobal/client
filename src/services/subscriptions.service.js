import httpClient from "../utils/httpClient";

export class SubscriptionsService {
    static getSubscriptions() {
        return httpClient.get('/subscriptions')
    }

    static subscribeToPlan(subscriptionId) {
        return httpClient.post(`/subscriptions/${subscriptionId}/subscribe`)
    }
}
