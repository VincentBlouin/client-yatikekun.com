import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/à-propos',
        name: 'Welcome',
        component: () => import( '../views/About.vue')
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
        path: '/confirm-transaction/:token',
        name: 'ConfirmTransaction',
        component: () => import('../views/ConfirmTransaction.vue')
    },
    {
        path: '/change-password/:token',
        name: 'ChangePassword',
        component: () => import('../views/ChangePassword.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
