import Service from '@/Service'

const usersResourceUrl = "/users/";
const sessionResourceUrl = usersResourceUrl + "session/";
let authenticatedUserInCache;
const UserService = {
    authenticatedUserInCache: function () {
        return authenticatedUserInCache || {};
    },
    setAuthenticatedUserInCache: function (user) {
        authenticatedUserInCache = user;
    },
    currentUserUri: function () {
        return usersResourceUrl + UserService.authenticatedUserInCache().user_name;
    },
    authenticatedUser: function () {
        return UserService._getCurrentUser().then(function (response) {
            authenticatedUserInCache = response.data;
            return response;
        });
    },
    _getCurrentUser: function () {
        return Service.api().get(sessionResourceUrl);
    },
    resetPassword: function (email) {
        return Service.api().post(
            "reset-password",
            {email: email}
        );
    },
    changePassword: function (password, token) {
        return Service.api().post(
            "/change-password",
            {
                newPassword: password,
                token: token
            }
        );
    },
    search: function (searchText) {
        return Service.api().post(
            UserService.currentUserUri() + "/search-users",
            {
                "searchText": searchText
            }
        )
    }
};
export default UserService
