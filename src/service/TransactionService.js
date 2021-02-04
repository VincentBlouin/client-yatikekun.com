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
    }
}
