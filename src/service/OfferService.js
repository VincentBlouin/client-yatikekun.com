import Service from '@/Service'

export default {
    list: function () {
        return Service.api().get(
            "offer"
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
    }
}