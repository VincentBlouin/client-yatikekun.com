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
        path: '/about',
        name: 'Welcome',
        component: () => import( '../views/About.vue')
    },
    {
        path: '/charte',
        name: 'Charte',
        component: () => import('../views/Charter.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
