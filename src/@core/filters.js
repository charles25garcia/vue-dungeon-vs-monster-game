import Vue from 'vue';

Vue.filter('classIdToBtnClass', (classId) => {
    switch (classId) {
        case 1:
            return "primary";
        case 2:
            return "success";
        case 3:
            return "danger";
        case 4:
            return "info";
        case 5:
            return "default";
        default:
            return "";
    }
});

Vue.filter('classTypeToGif', (classType) => {
    switch (classType) {
        case 1:
            return "saber.gif";
        case 2:
            return "archer.gif";
        case 3:
            return "lancer.gif";
        case 4:
            return "berserker.gif";
        case 5:
            return "caster.gif";
        default:
            return "";
    }
});

Vue.filter('classTypeToName', (classType) => {
    switch (classType) {
        case 1:
            return "Saber";
        case 2:
            return "Archer";
        case 3:
            return "Lancer";
        case 4:
            return "Berserker";
        case 5:
            return "Caster";
        default:
            return "";
    }
});

Vue.filter('skillTypeFaIcon', (skillType) => {
    switch (skillType) {
        case 'P':
            return "fist-raised";
        case 'M':
            return "magic";
        default:
            return "";
    }
});

Vue.filter('skillTypeColor', (skillType) => {
    switch (skillType) {
        case 'P':
            return "#dc3545";
        case 'M':
            return "#368cbc";
        default:
            return "";
    }
});

Vue.filter('skillTypeWord', (skillType) => {
    switch (skillType) {
        case 'P':
            return "Physical";
        case 'M':
            return "Magical";
        default:
            return "";
    }
});

Vue.filter('itemTypeToWord', (itemType) => {
    switch (itemType) {
        case 'WPN':
            return "Weapon";
        case 'AMR':
            return "Armor";
        default:
            return "";
    }
});