import { getValidAccount } from '../shared/functions/localStorage';


export default [
    {
        name: 'login',
        path: '/login',
        component: () => import('../components/form/LoginForm.vue'),
        beforeEnter: (to, from, next) => {
            const { accountId } = getValidAccount();
            if (accountId != null && from.name) next('/character');
            next();
        }
    },
    {
        name: 'registration',
        path: '/registration',
        component: () => import('../components/form/UserForm.vue'),
    },
]