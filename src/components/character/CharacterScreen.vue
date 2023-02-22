<template>
  <div class="characterScreen">
    <div class="characterContainer">
      <character-avatar></character-avatar>
      <character-stats></character-stats>
    </div>
    <div class="itemSkillContainer">
      <character-skills></character-skills>
      <character-equipment></character-equipment>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// types
import {
  character,
  characterId,
  activeAccountId,
} from "../../@core/store/types/getterType";

//component
import Avatar from "./Avatar";
import Stats from "./Stats";
import Skills from "./Skills";
import Equipment from "./Equipment";

export default {
  components: {
    "character-avatar": Avatar,
    "character-stats": Stats,
    "character-skills": Skills,
    "character-equipment": Equipment,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      character,
      characterId,
      activeAccountId,
    }),
  }
};
</script>
<style scoped>
.characterScreen {
  width: 100%;
  height: 100%;
  padding: 2%;
}

.characterScreen div {
  padding: 5px;
}

.characterScreen div div {
  border: solid #00010333;
  height: 50%;
}

.characterContainer {
  background-color: transparent;
  width: 50%;
  height: 100%;
  float: left;
}

.itemSkillContainer {
  float: right;
  background-color: transparent;
  width: 50%;
  height: 100%;
}

</style>
