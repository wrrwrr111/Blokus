import Vue from 'vue'
import Router from 'vue-router'
import Blokus from '@/components/Blokus'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Blokus',
        component: Blokus
    }]
})
