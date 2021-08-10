import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'About',
        alias: '/a-propos',
        component: () => import('../views/About.vue')
    },
    {
        path: '/charte',
        name: 'Charte',
        component: () => import('../views/Charter.vue')
    },
    {
        path: '/connexion',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/offres',
        name: 'Offers',
        component: () => import('../views/Offers.vue')
    },
    {
        path: '/vos-offres',
        name: 'YourOffers',
        component: () => import('../views/YourOffers.vue')
    },
    {
        path: '/offre',
        name: 'OfferNew',
        component: () => import('../views/Offer.vue')
    },
    {
        path: '/offre/:offerId',
        name: 'OfferModify',
        component: () => import('../views/Offer.vue')
    },
    {
        path: '/membres',
        name: 'Members',
        component: () => import('../views/Members.vue')
    },
    {
        path: '/membre',
        name: 'MemberNew',
        component: () => import('../views/Member.vue')
    },
    {
        path: '/membre/:memberId',
        name: 'MemberModify',
        component: () => import('../views/Member.vue')
    },
    {
        path: '/consulter-offre/:offerId',
        name: 'ConsultOffer',
        component: () => import('../views/ConsultOffer.vue')
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: () => import('../views/Transactions.vue')
    },
    {
        path: '/transaction/:transactionId',
        name: 'TransactionPage',
        component: () => import('../views/TransactionPage.vue')
    },
    {
        path: '/partenaires',
        name: 'Partners',
        component: () => import('../views/Partners.vue')
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
