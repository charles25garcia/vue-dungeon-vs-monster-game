<template>
  <div class="dungeonInfo">
    
    <h5 v-if="dungeon.locked">
      {{ dungeon.name }}
    </h5>
    <h5 v-else>
      <button class="btn btn-success" @click="enterDungeon(dungeon)">
        {{ dungeon.name }} <font-awesome-icon icon="sign-in-alt" />
      </button>
    </h5>

    <div>
      <h6>Reqiuements</h6>
    </div>
    <div class="requirements">
      <div>
        ○ Recomended Level: <label>{{ dungeon.recommendedLevel }}</label>
      </div>

      <div>
        ○ Boss Reqiuement:
        <!-- <font-awesome-icon icon="lock" color="#016212"  v-if="dungeon.locked"/> -->
        <label v-if="dungeon.bossReq">{{ dungeon.bossReq.name }}</label>
        <label v-else>{{ "N/A" }}</label>
      </div>
    </div>
    <div><h6>Enemy Info</h6></div>
    <div class="lock" v-if="dungeon.locked">
      <font-awesome-icon icon="lock" color="#016212" />
    </div>
    <div class="enemyInfo" v-else>
      <div v-for="(enemy, i) in dungeon.enemies" :key="i">
        ○
        <label
          v-popover:characterPopover.top
          @mouseenter="enemyMouseEnter(enemy)"
          @mouseleave="enemyMouseLeave()"
        >
          {{ enemy.name }}
        </label>
      </div>
    </div>

    <div v-show="selectedEnemy.drops.length > 0"><h6>Drop Item</h6></div>
    <div class="dropItem">
      <div v-for="(item, i) in selectedEnemy.drops" :key="i">
        ○
        <label> {{ item.name }} ({{ item.type | itemTypeToWord }}) </label>
      </div>
    </div>

    <popover :name="'characterPopover'" :event="'hover'">
      <div class="popoverContent">
        <img :src="`../enemies/${selectedEnemy._id}.gif`" alt="Trulli" />
        <h6>{{ selectedEnemy.name }}</h6>
      </div>
    </popover>
  </div>
</template>
<script>
export default {
  props: ["dungeon", "enterDungeonFn"],
  data() {
    return {
      selectedEnemy: {},
    };
  },
  methods: {
    defaultNA(value) {
      return value ? value : "N/A";
    },
    enemyMouseEnter(enemy) {
      this.selectedEnemy = enemy;
    },

    enemyMouseLeave() {
      this.selectedEnemy = {
        drops: [],
      };
    },
    enterDungeon(dungeon) {
      this.enterDungeonFn(dungeon);
    }
  },
  created() {
    this.selectedEnemy = {
      drops: [],
    };
  },
};
</script>
<style scoped>
.dungeonInfo {
  padding: 5% 0% 10% 0% !important;
  color: #89bdaa;
}

.dungeonInfo div {
  text-align: left;
  padding-left: 5%;
  font-size: 14px;
}

h6 {
  color: #5bb392;
  text-shadow: 1px 1px black;
  font-size: 18px !important;
}

table {
  width: 100%;
  padding: 20% !important;
  text-align: left;
}

table td {
  width: 50%;
}

label {
  text-shadow: 1px 1px black;
  color: #21b881;
}

.enemyInfo div label {
  cursor: pointer;
}

.enemyInfo div label:hover {
  color: #06724a !important;
}

.requirements,
.enemyInfo,
.dropItem {
  max-height: 30%;
  overflow: auto;
}

.enemyInfo,
.dropItem {
  height: 30%;
}

.requirements {
  height: 15%;
}

.lock {
  font-size: 22px !important;
  text-align: center !important;
  border: solid 1px #00010333;
}

.popoverContent {
  text-align: center !important;
}

img {
  height: 100px;
  width: 100px;
}

.vue-popover {
  padding-left: 0px !important;
}

button {
  background-color: transparent;
  color: #6db89b;
  font-size: 20px !important;
  border: none;
}

button:hover {
  color: #21b87d;
  background-color: transparent;
}
</style>
