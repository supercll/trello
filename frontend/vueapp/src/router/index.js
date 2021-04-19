import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// import Statistics from '../views/Statistics.vue';

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue');
const Board = () => import(/* webpackChunkName: "Board" */ '../views/Board.vue');
const Card = () => import(/* webpackChunkName: "Card" */ '../views/Card.vue');
const Register = () => import(/* webpackChunkName: "Register" */ '../views/Register.vue');
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue');
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue');
const Statistics = () => import(/* webpackChunkName: "Statistics" */ '../views/Statistics.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/board/:id(\\d+)',
    name: 'Board',
    component: Board,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'list/:listId(\\d+)/card/:cardId(\\d+)',
        name: 'Card',
        component: Card
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

store.commit('user/initUserInfo');
router.beforeEach((to, from, next) => {
  // 如果该路由需要鉴权，则验证用户的信息，如果不通过则跳转到登录页
  if (to.matched.some(matched => matched.meta.requiresAuth) && !store.state.user.info) {
    next({
      name: 'Login'
    });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  if (to.path === '/') {
  }
});

export default router;
