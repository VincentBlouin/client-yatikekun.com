import Service from '@/Service'

export default {
    list: function () {
        return Service.api().get(
            "member"
        );
    },
    create: function (member) {
        return Service.api().post('/member', member);
    },
    get: function (member) {
        return Service.api().get('/member/' + member.uuid)
    },
    update: function (member) {
        return Service.api().put('/member/' + member.uuid, member)
    },
    getNbMembers: function () {
        return Service.api().get('/member/count')
    },
    getMembersOfHgNotOfPartageHeure: function(){
        return Service.api().get('/member/members-of-hg-not-of-partageheure')
    }
}
