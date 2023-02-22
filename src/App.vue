<template>
  <div id="app">
    <div class="row" >
      <div class="column1" style="background-color: #aaa">
        <app-side-menu></app-side-menu>
      </div>
      <div class="column2">
        <div class="loading" v-show="isWebBusy"></div>
        <router-view v-show="!isWebBusy"></router-view>
      </div>
      <div class="column3"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// Component
import SideMenu from "./components/game/SideMenu";

// Types
import { isWebBusy } from "./@core/store/types/getterType";

export default {
  // name: "Monster Slayer - Final Project",
  components: {
    "app-side-menu": SideMenu,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isWebBusy,
    }),
  },
};
</script>

<style>
@import url("./assets/style/globalStyle.css");
</style>
