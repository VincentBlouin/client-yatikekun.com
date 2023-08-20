import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'AboutPage',
        alias: '/a-propos',
        component: () => import('../views/AboutPage.vue')
    },
    {
        path: '/charte',
        name: 'Charte',
        component: () => import('../views/CharterPage.vue')
    },
    {
        path: '/vie-prive',
        name: 'ViePrive',
        component: () => import('../views/PrivateLife.vue')
    },
    {
        path: '/connexion',
        name: 'LoginPage',
        component: () => import('../views/LoginPage.vue')
    },
    {
        path: '/offres',
        name: 'OffersPage',
        component: () => import('@/views/OffersPage.vue')
    },
    {
        path: '/vos-offres',
        name: 'YourOffers',
        component: () => import('../views/YourOffers.vue')
    },
    {
        path: '/offre',
        name: 'OfferNew',
        component: () => import('../views/OfferPage.vue')
    },
    {
        path: '/offre/:offerId',
        name: 'OfferModify',
        component: () => import('../views/OfferPage.vue')
    },
    {
        path: '/membres',
        name: 'MembersPage',
        component: () => import('../views/MembersPage.vue')
    },
    {
        path: '/organisations',
        name: 'Organisations',
        component: () => import('../views/OrganisationsPage.vue')
    },
    {
        path: '/organisation',
        name: 'OrganisationNew',
        component: () => import('../views/OrganisationPage.vue')
    },
    {
        path: '/organisation/:organisationId',
        name: 'OrganisationModify',
        component: () => import('../views/OrganisationPage.vue')
    },
    {
        path: '/organisation/:organisationId/transactions',
        name: 'OrganisationTransactions',
        component: () => import('../views/OrganisationPage.vue')
    },
    {
        path: '/membre',
        name: 'MemberNew',
        component: () => import('../views/MemberPage.vue')
    },
    {
        path: '/membre/:memberId',
        name: 'MemberModify',
        component: () => import('../views/MemberPage.vue')
    },
    {
        path: '/consulter-offre/:offerId',
        name: 'ConsultOffer',
        component: () => import('../views/ConsultOffer.vue')
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: () => import('../views/MemberTransactions.vue')
    },
    {
        path: '/transaction/toutes',
        name: 'AllTransactions',
        component: () => import('../views/AllTransactions.vue')
    },
    {
        path: '/transaction/:transactionId',
        name: 'TransactionPage',
        component: () => import('../views/TransactionPage.vue')
    },
    {
        path: '/transaction/:transactionId/confirm/:token',
        name: 'TransactionPageWithToken',
        component: () => import('../views/TransactionPage.vue')
    },
    {
        path: '/partenaires',
        name: 'PartnersPage',
        component: () => import('../views/PartnersPage.vue')
    },
    {
        path: '/confirm-transaction/:token',
        name: 'ConfirmTransaction',
        component: () => import('../views/ConfirmTransaction.vue')
    },
    {
        path: '/change-password/:token',
        name: 'ChangePassword',
        component: () => import('../views/ChangePassword.vue')
    },
    {
        path: '/send-change-password-email',
        name: 'SendChangePasswordEmail',
        component: () => import('../views/SendChangePasswordEmail.vue')
    },
    {
        path: '/stats',
        name: 'StatsPage',
        component: () => import('../views/admin/StatsPage.vue')
    },
    {
        path: '/97bb2261',
        name: 'MembersOfHg',
        component: () => import('../views/MembersOfHg.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        // if (savedPosition) {
        //     return new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve({
        //                 savedPosition
        //             });
        //         }, 1000);
        //     });
        // } else {
        //
        // }
        console.log("scroll behavior");
        return {x: 0, y: 0};
    },
    routes,
})

export default router
