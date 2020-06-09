import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
const Board = () => import(/* webpackChunkName: "Board" */ '../views/Board.vue')
const Card = () => import(/* webpackChunkName: "Card" */ '../views/Card.vue')
const Register = () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/board/:id(\\d+)',
        name: 'Board',
        component: Board,
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
        path: '*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
