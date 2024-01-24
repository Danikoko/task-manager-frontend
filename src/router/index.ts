import { createRouter, createWebHistory } from 'vue-router';
import ErrorPage from '../pages/Error404.vue';
import LoginPage from '../pages/auth/Login.vue';
import RegisterPage from '../pages/auth/Register.vue';

import DashboardPage from '../pages/dashboard/Index.vue';
import CategoriesPage from '../pages/dashboard/Categories.vue';
import ProfilePage from '../pages/dashboard/Profile.vue';

import { useUserStore } from '../store';
import { storeToRefs } from 'pinia';

const USER_IS_LOGGED_IN = (_to: any, _from: any, next: any) => {
    const userStore = useUserStore();
    const { loggedIn } = storeToRefs(userStore);

    return (loggedIn.value == true)
        ? next()
        : next({
            name: 'Login'
        });
}

const USER_IS_LOGGED_OUT = (_to: any, _from: any, next: any) => {
    const userStore = useUserStore();
    const { loggedIn } = storeToRefs(userStore);

    return (loggedIn.value == false)
        ? next()
        : next({
            name: 'Dashboard'
        });
}

const routes = [
    {
        name: 'Dashboard',
        path: '/',
        component: DashboardPage,
        beforeEnter: [
            USER_IS_LOGGED_IN
        ]
    },
    {
        name: 'Categories',
        path: '/categories',
        component: CategoriesPage,
        beforeEnter: [
            USER_IS_LOGGED_IN
        ]
    },
    {
        name: 'Profile',
        path: '/profile',
        component: ProfilePage,
        beforeEnter: [
            USER_IS_LOGGED_IN
        ]
    },
    {
        name: 'Login',
        path: '/auth/login',
        component: LoginPage,
        beforeEnter: USER_IS_LOGGED_OUT
    },
    {
        name: 'Register',
        path: '/auth/register',
        component: RegisterPage,
        beforeEnter: USER_IS_LOGGED_OUT
    },
    {
        name: 'Error404',
        path: '/:pathMatch(.*)*',
        component: ErrorPage,
    }
];

const router = createRouter({
    scrollBehavior: () => {
        return {
            left: 0,
            top: 0
        }
    },
    history: createWebHistory(),
    routes
});

export default router;