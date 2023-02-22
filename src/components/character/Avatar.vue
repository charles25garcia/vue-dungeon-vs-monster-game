<template>
  <div class="avatar">
    <img
      v-bind:src="`../character/Player/${getGifFromClassType(character.classType)}`"
    />
    <h5>{{ character.name }} ({{ character.classType | classTypeToName }})</h5>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// types
import { character } from "../../@core/store/types/getterType";

// mixin
import GameMixin from "../../shared/mixin/GameMixin";


export default {
  mixins: [GameMixin],
  computed: {
    ...mapGetters({
      character,
    }),
  }
};
</script>

<style scoped>
.avatar {
  background-image: url("../../assets/border/avatar-border.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: rgba(10, 16, 43, 0.2);
  text-align: center;
  border-bottom-width: 0px;
}

.avatar img {
  margin-top: 5%;
  height: 80%;
}

h5 {
  text-shadow: 1px 1px black;
  color: #4a9177;
}
</style>