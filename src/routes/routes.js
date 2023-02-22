import userRoute from './userRoute';
import gameRoute from './gameRoute';
import VueRouter from 'vue-router';
import { getValidAccount, refreshAccountExpiration } from '../shared/functions/localStorage';
import store from '../@core/store/store';
import routesWithoutAuth from './routesWithoutAuth';
import { setAccountIdAction } from '../@core/store/types/actionTypes';

//Route delcaration
const routes = [
    ...userRoute,
    ...gameRoute,
    {
        path: '*',
        redirect: '/login',
    },
];

/* 
    Route inictialization
*/
const router = new VueRouter({
    routes,
    mode: 'history'
});

/* 
    Global guards
*/
router.beforeEach((to, from, next) => {
    const { accountId } = getValidAccount();

    if (accountId == null && !routesWithoutAuth.includes(to.name)) {
        next('/login');
    }
    else if (accountId != null && routesWithoutAuth.includes(to.name)) {
        next('/character');
    }
    else if (accountId == null && routesWithoutAuth.includes(to.name)) {
        next();
    } else {
        refreshAccountExpiration();
        store.dispatch(setAccountIdAction, accountId);
        next();
    }
});


export default router;