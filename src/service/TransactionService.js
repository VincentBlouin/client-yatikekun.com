import Service from '@/Service'

export default {
    list: function (user) {
        return Service.api().get(user.id + '/transaction')
    },
    add: function (transaction) {
        return Service.api().post(
            '/transaction',
            transaction
        )
    },
    getPendingForOfferAndUserId: function (offerId, userId) {
        const response = Service.api().get(
            '/transaction/pending/user/' + userId + '/offer/' + offerId
        );
        return response.data;
    }
}
