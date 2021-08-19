import Service from '@/Service'

export default {
    list: function () {
        return Service.api().get(
            "organisation"
        );
    },
    get: function (organisationId) {
        return Service.api().get('/organisation/' + organisationId)
    },
    uploadImage: function (formData) {
        return Service.api().post('/organisation/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    create: function (organisation) {
        return Service.api().post('/organisation', organisation);
    },
    update: function (organisation) {
        return Service.api().put('/organisation/' + organisation.id, organisation)
    }
}
