import sortByName from '../../shared/functions/array/sortByName';

const equipmentDefaultValue = {
    item: {
        bonus: {
            health: 0,
            mana: 0,
            off: 0,
            def: 0,
            agi: 0,
            int: 0,
            luk: 0
        },
        name: '',
        _id: '',
        type: ''
    },
    name: '',
    _id: '',
    type: ''
}

export default {
    activeAccountId: (state) => state.activeAccountId,
    isWebBusy: (state) => state.isWebBusy,
    character: (state) => state.character,
    dungeons: (state) => state.dungeons,
    characterId: (state) => state.character._id,
    characterSkills: (state) => sortByName(state.character.skills),
    characterStats: (state) => state.character.stats,
    characterEquipments: (state) => state.character.equipment,
    availableSkills: (state) => sortByName(state.availableSkills),
    availableEquipment: (state) => state.availableEquipment,
    characterWeapon: (state) => state.character.equipment?.weapon || equipmentDefaultValue,
    characterArmor: (state) => state.character.equipment?.armor || equipmentDefaultValue,
    availableWeapon: ({ availableEquipment, character }) => sortByName(availableEquipment.filter((e, index, array) => e.item.classId == character.classType && e.item.type == 'WPN' && array.map(i => i.item._id).indexOf(e.item._id) === index)),
    availableArmor: ({ availableEquipment, character }) => sortByName(availableEquipment.filter((e, index, array) => e.item.classId == character.classType && e.item.type == 'AMR' && array.map(i => i.item._id).indexOf(e.item._id) === index)),
    characterClassType: (state) => state.character.classType,
    gameData: (state) => state.gameData,
    dungeonId: (state) => state.dungeonId
}