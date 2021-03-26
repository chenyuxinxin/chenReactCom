import Login from './pages/login'
import Example from './pages/example'
import Healthz from './pages/healthz'
import Home from './pages/home/index.jsx'
import User from './pages/user/index.js'


export default [
    {
        path: '/login',
        exact: true,
        component: Login
    },
    {
        path: '/ex',
        exact: true,
        component: Example
    },
    {
        path: '/healthz',
        exact: true,
        component: Healthz
    },
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/user',
        exact: true,
        component: User
    },


]
