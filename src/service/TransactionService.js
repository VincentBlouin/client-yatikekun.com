import Service from '@/Service'

export default {
    listForUserId: function (userId) {
        return Service.api().get('/transaction/user/' + userId);
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
    removeTransaction: async function (transactionId) {
        return Service.api().delete(
            '/transaction/' + transactionId
        );
    }
}
