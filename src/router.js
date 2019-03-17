import Vue from 'vue'
import Router from 'vue-router'
import OnlineVue from './views/OnlineVue.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/onlineVue'
    },
    {
      path: '/onlineVue',
      name: 'onlineVue',
      component: OnlineVue
    }
  ]
})
