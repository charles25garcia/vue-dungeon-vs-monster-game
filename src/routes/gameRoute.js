import store from '../@core/store/store';
import {
    getCharacterAction,
    getCharacterAvailableSkillsAction,
    getAvailableEquipemntAction,
    getDungeonsAction,
    getDungeonAction
} from '../@core/store/types/actionTypes';

export default [
    {
        name: 'gamecard',
        path: '/gamecard',
        component: () => import('../components/game/GameCard.vue'),
        beforeEnter: (to, from, next) => {
            const getters = { ...store.getters }
            if (getters.dungeonId == null || from.name == null) {
                next('/dungeon')
            } else {
                store.dispatch(getDungeonAction, getters.dungeonId).then(() => {
                    next();
                });

            }

        },
    },
    {
        name: 'character',
        path: '/character',
        component: () => import('../components/character/CharacterScreen.vue'),
        beforeEnter: (to, from, next) => {
            const getters = { ...store.getters }
            store.dispatch(getCharacterAction, getters.activeAccountId).then(() => {
                store.dispatch(getCharacterAvailableSkillsAction).then(() => {
                    store.dispatch(getAvailableEquipemntAction).then(() => next());

                });
            });
        }
    },
    {
        name: 'dungeon',
        path: '/dungeon',
        component: () => import('../components/dungeon/Dungeon.vue'),
        beforeEnter: (to, from, next) => {
            const getters = { ...store.getters }

            store.dispatch(getCharacterAction, getters.activeAccountId).then(() => {
                store.dispatch(getDungeonsAction).then(() => {
                    next();
                });
            });
        }
    }
];