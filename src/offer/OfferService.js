import Service from '@/Service'

export default {
    list: function () {
        return Service.api().get(
            "offer"
        );
    },
    listForUserId: function (userId) {
        return Service.api().get(
            "offer/user/" + userId
        );
    },
    uploadImage: function (formData) {
        return Service.api().post('/offer/image', formData)
    },
    getImageUrl: function (offer) {
        if (offer.customImage === null) {
            return ''
        }
        return Service.baseUrl() + '/offer/image/' + offer.customImage.fileName
    },
    create: function (offer) {
        return Service.api().post('/offer', offer)
    },
    get: function (offer) {
        return Service.api().get('/offer/' + offer.id)
    },
    update: function (offer) {
        return Service.api().put('/offer/' + offer.id, offer)
    },
}