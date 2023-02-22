<template>
  <div class="dungeon">
    <div class="dungeonList">
      <div class="list">
        <div
          v-for="(dungeon, i) in dungeons"
          :key="i"
          :class="[
            { active: selectedDungeon._id === dungeon._id },
            { lock: dungeon.locked },
          ]"
          @click="selectDungeon(dungeon)"
        >
          <img v-bind:src="`../dungeon/${dungeon.image}.gif`" />
        </div>
      </div>
    </div>
    <dungeon-info
      :dungeon="selectedDungeon"
      :enterDungeonFn="enterDungeon"
    ></dungeon-info>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// types
import { dungeons } from "../../@core/store/types/getterType";

import { setDungeonId } from "../../@core/store/types/mutationTypes";

import DungeonInfo from "./DungeonInfo";

export default {
  components: {
    "dungeon-info": DungeonInfo,
  },
  data() {
    return {
      selectedDungeon: {},
    };
  },
  methods: {
    selectDungeon(dungeon) {
      this.selectedDungeon = dungeon;
    },
    enterDungeon(dungeon) {
      this.$confirm(
        `Are you sure you want to enter ${dungeon.name}?`,
        dungeon.name,
        "success",
        {
          customClass: "successMessage",
        }
      )
        .then(() => {
          this.$store.commit(setDungeonId, dungeon._id);
          this.$router.push("/gameCard");
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapGetters({
      dungeons,
    }),
  },
  created() {
    this.selectedDungeon = this.dungeons[0];
  },
};
</script>
<style scoped>
.dungeon {
  width: 100%;
  height: 100%;
  padding: 2%;
}
.dungeon div {
  padding: 5px;
  border: solid #00010333;
  height: 100%;
  width: 49.6%;
}

.dungeonList {
  float: left;
}

.dungeonList .list {
  width: 100%;
  border: none;
  overflow: auto;
  max-height: 100%;
}

.dungeonList .list div {
  width: 100%;
  height: 40%;
  margin-bottom: 1%;
  cursor: pointer;
}

.dungeonList .list div:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

div.active {
  background-color: rgba(255, 255, 255, 0.3) !important;
}

div.lock {
  background-color: rgb(24, 36, 32);
  background-image: url("../../assets/lock.png");
  background-size: 50% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

div.lock img {
  opacity: 0.2;
}

.dungeonInfo {
  float: right;
  text-align: center;
}

img {
  height: 100%;
  width: 100%;
}
</style>
