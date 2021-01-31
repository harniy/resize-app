import VueRouter from 'vue-router'

import crope from '../pages/crope.vue'
import resize from '../pages/resizeImage.vue'


export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'resize',
            component: resize
        },
        {
            path: '/crope',
            name: 'crope',
            component: crope,
            routes: true
        }
    ]
})