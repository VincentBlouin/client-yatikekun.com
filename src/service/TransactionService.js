import Service from '@/Service'

export default {
    list: function (user) {
        return Service.api().get(user.id + '/transaction');
    },
    add: function (transaction) {
        return Service.api().post(
            '/transaction',
            transaction
        );
    },
    confirm: function(transactionId){
        return Service.api().post(
            '/transaction/' + transactionId + '/confirm'            
        );
    },
    getPendingForOfferAndUserId: async function (offerId, userId) {
        const response = await Service.api().get(
            '/transaction/pending/user/' + userId + '/offer/' + offerId
        );
        return response.data;
    }
}
