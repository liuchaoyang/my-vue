import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/DashBoard'
import UserList from '@/components/user/UserList'
import DoctorOrderList from '@/components/user/DoctorOrderList'
import ProductOrderList from '@/components/user/ProductOrderList'
import Banner from '@/components/home/Banner'
import PhysicalList from '@/components/physical/PhysicalList'
import PhysicalOrderList from '@/components/physical/PhysicalOrderList'
import SurgeryList from '@/components/surgery/SurgeryList'
import SurgeryOrderList from '@/components/surgery/SurgeryOrderList'
import RecommendList from '@/components/recommend/RecommendList'
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
        path: 'banner',
        component: Banner
      },{
        path: 'user/list',
        component: UserList
      },{
        path: 'physical/list',
        component: PhysicalList
      },{
        path: 'surgery/list',
        component: SurgeryList
      },{
        path: 'show/doctor-order',
        component: DoctorOrderList
      },{
        path: 'show/physical-order',
        component: PhysicalOrderList
      },{
        path: 'show/surgery-order',
        component: SurgeryOrderList
      },{
        path: 'show/product-order',
        component: ProductOrderList
      },{
        path: 'show/recommend',
        component: RecommendList
      }]
    }
  ]
})
