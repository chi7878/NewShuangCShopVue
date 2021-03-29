import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home-page/pages/home/home.vue'
import login from './components/login/pages/login/login.vue';
import checkOrder from './components/home-page/pages/check-order/check-order.vue';
import dashboard from './components/dashboard/pages/dashboard-page/dashboard-page.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'*',
      redirect: '/home'
    },
    {
      path: '/',
      name: 'index',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: Home
    },
    {
      path: '/question',
      name: 'question',
      component: Home
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: Home
    },
    {
      path: '/return',
      name: 'return',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: Home
    },
    {
      path: '/products',
      name: 'products',
      component: Home
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/innerLogin',
      name: 'innerLogin',
      component: login
    },
    {
      path: '/checkOrder',
      name: 'checkOrder',
      component: checkOrder
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      beforeEnter (to, from, next) {
        if (document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1') === '') {
          next('/home');
        } else {
          next();
        }
      }
    }
  ]
})
