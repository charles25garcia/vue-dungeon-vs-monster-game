// Types
import { getCharacterAction, getAvailableEquipemntAction } from './types/actionTypes';

export default {
    setAccountId: (state, value) => {
        state.activeAccountId = value;
    },
    setIsWebBusy: (state, value) => {
        state.isWebBusy = value;
    },
    setCharacter: (state, value) => {
        state.character = value;
    },
    setDungeons: (state, value) => {
        state.dungeons = value;
    },
    setAvailableSkills: (state, value) => {
        state.availableSkills = value;
    },
    updateCharacterSkills(state) {
        this.dispatch(getCharacterAction, state.activeAccountId).then();
    },
    setAvailableEquipment(state, value) {
        state.availableEquipment = value;
    },
    updateCharacterEquipment(state) {
        this.dispatch(getCharacterAction, state.activeAccountId).then(() => {});
    },
    updateAvailableEquipment() {
        this.dispatch(getAvailableEquipemntAction).then();
    },
    setGameData: (state, value) => {
        state.gameData = value;
    },
    clearState: (state) => {
        state.activeAccountId = null;
        state.character = {};
        state.monster = {};
        state.dungeons = [];
        state.gameData = {};
        state.availableSkills = [];
        state.availableEquipment = [];
        state.isWebBusy = false;
        state.characterId = null;
    },
    setDungeonId: (state, value) => {
        state.dungeonId = value;
    }
}