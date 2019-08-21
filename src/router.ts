import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import InfoGraphic from './views/infoGraphic';
import GetProfile from './views/getProfile';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/info',
      name: 'info-graphic',
      component: InfoGraphic,
    },
    {
      path: '/getProfile',
      name: 'write profile',
      component: GetProfile,
    },
    {
      path: '/profile/:pid',
      name: 'view profile',
      component: InfoGraphic,
    },
  ],
});
