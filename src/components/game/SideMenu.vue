<template>
  <div class="sideMenu" v-show="activeAccountId !== null">
    <router-link to="/character" active-class="active">
      <div class="menu-item">Character</div>
    </router-link>
    <router-link to="/dungeon" active-class="active">
      <div class="menu-item">Dungeon</div>
    </router-link>
    <div class="menu-item" @click="logout()">Logout</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// types
import { activeAccountId } from '../../@core/store/types/getterType';
import { removeAccountIdAction } from '../../@core/store/types/actionTypes';
import { clearState } from '../../@core/store/types/mutationTypes';

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm('Are you sure you want to logout?', 'Warning', '', {
        customClass: 'warningMessage',
      })
        .then(() => {
          this.$store.dispatch(removeAccountIdAction);
          this.$store.commit(clearState);
          this.$router.push('/login');
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapGetters({
      activeAccountId,
    }),
  }
};
</script>
<style scoped>
.sideMenu {
  width: 100%;
  height: 100%;
}

.sideMenu .menu-item {
  border-top: solid #393a39 1px;
  border-bottom: solid #393a39 1px;
  text-align: center;
  cursor: pointer;
}

.sideMenu .menu-item:hover {
  background-color: rgb(100, 95, 95);
  color: #c7ecc5 !important;
}

a {
  text-decoration: none;
}

.router-link-exact-active.active {
  color: #c7ecc5 !important;
}
</style>
