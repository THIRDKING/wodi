import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import GoodsList from '@/views/GoodsList'
import GoodInfo from '@/views/GoodInfo'
import Cart from '@/views/ShopCartList'
import Checkout from '@/views/Checkout'
import Payment from '@/views/Payment'

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path:'/goodinfo',
      name:'GoodInfo',
      component:GoodInfo
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    },
    {
      path:'/checkout',
      name:'Checkout',
      component:Checkout
    },
    {
      path:'/payment',
      name:'Payment',
      component:Payment
    }
  ]
})
