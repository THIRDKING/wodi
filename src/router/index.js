import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import GoodsList from '@/views/GoodsList'
import GoodInfo from '@/views/GoodInfo'
import Cart from '@/views/ShopCartList'
import Checkout from '@/views/Checkout'
import Payment from '@/views/Payment'
import Account from '@/views/Account'
import Order from '@/views/account/Order'
import Address from '@/views/account/Address'

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
    },
    {
      path:'/account',
      component:Account,
      children:[
        {
          path:'',
          name:'Account',
          component:Order
        },
        {
          path:'address',
          name:'Address',
          component:Address
        }
      ]
    }
  ]
})
