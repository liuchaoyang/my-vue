import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/DashBoard'
import UserList from '@/components/user/UserList'
import PhysicalList from '@/components/physical/PhysicalList'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: DashBoard,
      children: [{
        path: '',
        component: Home
      },{
        path: 'user/list',
        component: UserList
      },{
        path: 'physical/list',
        component: PhysicalList
      }]
    }
  ]
})
