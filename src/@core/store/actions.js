import axios from 'axios';

import {removeAccountId } from '../../shared/functions/localStorage';
import {
    updateAvailableEquipment,
    updateCharacterEquipment,
    setAccountId,
    setIsWebBusy,
    setCharacter,
    setDungeons,
    setAvailableSkills,
    updateCharacterSkills,
    setAvailableEquipment,
    setGameData
} from './types/mutationTypes';


const accountApiUrl = `${process.env.VUE_APP_API_URL}accounts`;
const characterApiUrl = `${process.env.VUE_APP_API_URL}character`;
const dungeonsApiUrl = `${process.env.VUE_APP_API_URL}dungeons`;

export default {
    loginAction(context, { userName, password }) {
        context.commit(setIsWebBusy, true);

        return axios.post(`${accountApiUrl}/login`, { username: userName, password })
            .then((response) => {
                const { accountId } = response.data;
                context.commit(setAccountId, accountId);
                context.commit(setIsWebBusy, false);
                return response.data;
            })
            .catch(() => context.commit(setIsWebBusy, false));
    },
    addUserAction(context, user) {
        return axios.post(accountApiUrl, user);
    },
    setAccountIdAction: (context, value) => {
        context.commit(setIsWebBusy, true);
        context.commit(setAccountId, value);
        context.commit(setIsWebBusy, false);
    },
    removeAccountIdAction: (context) => {
        removeAccountId();

        context.commit(setAccountId, null);
    },
    getCharacterAction(context, activeAccountId) {
        context.commit(setIsWebBusy, true);
        return axios.get(`${accountApiUrl}/${activeAccountId}/character`)
            .then((response) => {
                context.commit(setCharacter, response.data);
                context.commit(setIsWebBusy, false);
            })
            .catch(() => context.commit(setIsWebBusy, false));
    },
    getDungeonsAction(context) {
        const getters = { ...context.rootGetters }
        context.commit(setIsWebBusy, true);
        return axios.get(`${characterApiUrl}/${getters.characterId}/dungeons`)
            .then((response) => {
                context.commit(setDungeons, response.data);
                context.commit(setIsWebBusy, false);
            })
            .catch(() => context.commit(setIsWebBusy, false));
    },
    getCharacterAvailableSkillsAction(context) {
        const getters = { ...context.rootGetters }
        context.commit(setIsWebBusy, true);
        axios.get(`${characterApiUrl}/${getters.characterId}/skills`)
            .then((response) => {
                context.commit(setAvailableSkills, response.data);
                context.commit(setIsWebBusy, false);
            })
            .catch(() => context.commit(setIsWebBusy, false));
    },
    updateCharacterSkillsAction(context, skillIds) {
        const getters = { ...context.rootGetters }
        context.commit(setIsWebBusy, true);
        return axios.put(`${characterApiUrl}/${getters.characterId}/skills`, skillIds)
            .then((response) => {
                if (response.status == 200) context.commit(updateCharacterSkills);

                context.commit(setIsWebBusy, false);

                return response;
            })
            .catch((response) => {
                context.commit(setIsWebBusy, false);
                return response;
            });
    },
    getAvailableEquipemntAction(context) {

        const getters = { ...context.rootGetters }

        context.commit(setIsWebBusy, true);
        return axios.get(`${characterApiUrl}/${getters.characterId}/inventory`)
            .then((response) => {
                context.commit(setAvailableEquipment, response.data);
                context.commit(setIsWebBusy, false);
            })
            .catch(() => context.commit(setIsWebBusy, false));
    },
    updateEquipmentAction(context, equiptment) {
        const getters = { ...context.rootGetters }
        context.commit(setIsWebBusy, true);
        return axios.put(`${characterApiUrl}/${getters.characterId}/equipment`, equiptment)
            .then((response) => {
                context.commit(updateCharacterEquipment);
                context.commit(updateAvailableEquipment);
                context.commit(setIsWebBusy, false);
                return response;
            })
            .catch(() => context.commit(setIsWebBusy, false));
    },
    removeEquipment(context, deletedIds) {
        const getters = { ...context.rootGetters }
        context.commit(setIsWebBusy, true);

        return axios.delete(`${characterApiUrl}/${getters.characterId}/inventory/${deletedIds}`)
            .then((response) => {
                context.commit(updateAvailableEquipment);
                context.commit(setIsWebBusy, false);
                return response;
            })
            .catch(() => context.commit(setIsWebBusy, false));
    },
    getDungeonAction(context, dungeonId) {
        const getters = { ...context.rootGetters }
        context.commit(setIsWebBusy, true);

        return axios.post(`${dungeonsApiUrl}/enter`, {
            characterId: getters.characterId,
            dungeonId
        })
            .then((response) => {
                context.commit(setGameData, response.data);
                context.commit(setIsWebBusy, false);
                return response;
            })
            .catch(() => context.commit(setIsWebBusy, false));
    },
    sendWinTheGameAction(context, enemyId) {
        const getters = { ...context.rootGetters }

        return axios.post(`${dungeonsApiUrl}/battle`, {
            characterId: getters.characterId,
            dungeonId: getters.dungeonId,
            enemyId
        })
            .then((response) => {
                return response;
            });
    },
}