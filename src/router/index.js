import Vue from 'vue'
import Router from 'vue-router'
import Blokus from '@/components/Blokus'
import room from '@/components/room'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Blokus',
        component: Blokus
    },{
        path: '/room',
        name: 'room',
        component: room
    }]
})
