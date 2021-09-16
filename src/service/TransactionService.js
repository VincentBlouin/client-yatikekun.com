import Service from '@/Service'

export default {
    listForUserId: function (userId) {
        return Service.api().get('/transaction/user/' + userId);
    },
    getForId: function (transactionId) {
        return Service.api().get('/transaction/' + transactionId);
    },
    add: function (transaction) {
        return Service.api().post(
            '/transaction',
            transaction
        );
    },
    confirm: function (transactionId) {
        return Service.api().post(
            '/transaction/' + transactionId + '/confirm'
        );
    },
    refuse: function (transactionId) {
        return Service.api().post(
            '/transaction/' + transactionId + '/refuse'
        );
    },
    confirmWithToken: function (token) {
        return Service.api().post(
            '/transaction/token', {
                token: token
            });
    },
    getPendingForOfferAndUserId: async function (offerId, userId) {
        const response = await Service.api().get(
            '/transaction/pending/user/' + userId + '/offer/' + offerId
        );
        return response.data;
    },
    getAllPendingOffers: async function (userId) {
        const response = await Service.api().get(
            '/transaction/pending/user/' + userId
        );
        return response.data || [];
    },
    removeTransaction: async function (transactionId) {
        return Service.api().delete(
            '/transaction/' + transactionId
        );
    }
}
