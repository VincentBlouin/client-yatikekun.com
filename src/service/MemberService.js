import Service from '@/Service'

export default {
    list: function () {
        return Service.api().get(
            "member"
        );
    },
    create: function (member) {
        return Service.api().post('/member', member);
    }
}