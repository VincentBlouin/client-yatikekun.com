import Service from '@/Service'

export default {
    list: function () {
        return Service.api().get(
            "offer"
        );
    },
    listForUserUuid: function (userUuid) {
        return Service.api().get(
            "offer/user/" + userUuid
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
    getMediumImageUrl: function (offerImage, offerCustomImage) {
        let fileName = offerImage ? offerImage.name + ".jpg" : offerCustomImage.fileName;
        return Service.baseUrl() + '/offer/image/' + fileName + '/medium'
    },
    getOfferImageById: async function (offerId) {
        const response = await Service.api().get('/offer/' + offerId + '/image');
        return response.data;
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
    remove: function (offerId) {
        return Service.api().delete('/offer/' + offerId)
    }
}
