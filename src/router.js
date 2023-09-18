import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
const routes = [{
        path: '/',
        component: () => import('@/views/Index.vue')
    },
    {
        path: '/video',
        component: () => import('@/views/Video.vue')
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})