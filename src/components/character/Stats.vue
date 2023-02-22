<template>
  <div class="stat">
    <h5>Stats</h5>
    <table>
      <tbody>
        <tr>
          <th>
            <font-awesome-icon icon="heartbeat" color="#5f2222" />
          </th>
          <td>Health</td>
          <td>
            {{ characterStats.health }}
            <additional-attribute :attrValue="addHealth"></additional-attribute>
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="hand-holding-water" color="#064467" />
          </th>
          <td>Mana</td>
          <td>
            {{ characterStats.mana }}
            <additional-attribute :attrValue="addMana"></additional-attribute>
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="hand-rock" color="#634c1c" />
          </th>
          <td>Offense</td>
          <td>
            {{ characterStats.off }}
            <additional-attribute :attrValue="addOff"></additional-attribute>
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="shield-alt" color="#585a5a" />
          </th>
          <td>Deffense</td>
          <td>
            {{ characterStats.def }}
            <additional-attribute :attrValue="addDef"></additional-attribute>
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="running" color="#2a6c45" />
          </th>
          <td>Agility</td>
          <td>
            {{ characterStats.agi }}
            <additional-attribute :attrValue="addAgi"></additional-attribute>
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="head-side-virus" color="#66c7d7" />
          </th>
          <td>Intelligence</td>
          <td>
            {{ characterStats.int }}
            <additional-attribute :attrValue="addInt"></additional-attribute>
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="user-shield" color="#939752" />
          </th>
          <td>Luck</td>
          <td>
            {{ characterStats.luk }}
            <additional-attribute :attrValue="addLuk"></additional-attribute>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// types
import {
  characterStats,
  characterEquipments,
} from "../../@core/store/types/getterType";

export default {
  data() {
    return {
      addHealth: 0,
      addMana: 0,
      addOff: 0,
      addDef: 0,
      addAgi: 0,
      addInt: 0,
      addLuk: 0,
    };
  },
  methods: {
    resetData() {
      const weaponBonus = this.characterEquipments.weapon.bonus;
      const armorBonus = this.characterEquipments.armor.bonus;

      this.addHealth = weaponBonus.health + armorBonus?.health;
      this.addMana = weaponBonus.mana + armorBonus?.mana;
      this.addOff = weaponBonus.off + armorBonus?.off;
      this.addDef = weaponBonus.def + armorBonus?.def;
      this.addAgi = weaponBonus.agi + armorBonus?.agi;
      this.addInt = weaponBonus.int + armorBonus?.int;
      this.addLuk = weaponBonus.luk + armorBonus?.luk;
    },
  },
  created() {
    //Additional attribute setup
    this.resetData();
  },
  watch: {
    characterEquipments() {
      this.resetData();
    },
    characterStats() {
      this.resetData();
    },
  },
  computed: {
    ...mapGetters({
      characterStats,
      characterEquipments,
    }),
  },
};
</script>
<style scoped>
</style>