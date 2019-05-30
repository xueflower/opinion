import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ArticalDetail from '@/components/ArticalDetail'
import Login from '@/components/Login'
import OpinionWork from '@/components/OpinionWork'
import TabBar from '@/components/TabBar'
import Test from "@/components/Test"
Vue.use(Router)
Vue.use(Vuex)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/opinion',
      name: 'opinion',
      component: OpinionWork
    },
    {
      path: '/detail',
      name: 'detail',
      component: ArticalDetail
    },
    {
      path: '/addartical',
      name: 'addartical',
      component: Test
    },
    {
      path: '/articaldetail',
      name: 'ArticalDetail',
      component: ArticalDetail
    }
  ]
})
