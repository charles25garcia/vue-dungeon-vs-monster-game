<template>
  <div class="equipment">
    <h5>Equipment</h5>
    <b-tabs content-class="mt-3" lazy>
      <b-tab>
        <template v-slot:title>
          <div @mouseenter="setPopup()" @mouseleave="setPopup()">Weapon</div>
        </template>
        <h6>
          <img v-bind:src="'../tool/weapon.gif'" />
          {{ characterWeapon.name }}
          <b-button
            v-popover:weaponPopover.right
            type="submit"
            class="btn btn btn-default btn-sm btn-secondary"
          >
            <font-awesome-icon icon="exchange-alt" />
          </b-button>
        </h6>

        <equipment-stats :stats="characterWeapon.bonus"></equipment-stats>
      </b-tab>
      <b-tab>
        <template v-slot:title>
          <div @mouseenter="setPopup()" @mouseleave="setPopup()">Armor</div>
        </template>
        <h6>
          <img v-bind:src="'../tool/armor.gif'" />
          {{ characterArmor.name }}
          <button
            type="submit"
            class="btn btn btn-default btn-sm btn-secondary"
            v-popover:armorPopover.right
          >
            <font-awesome-icon icon="exchange-alt" />
          </button>
        </h6>
        <equipment-stats :stats="characterArmor.bonus"></equipment-stats>
      </b-tab>
    </b-tabs>
    <item-selector-popover
      :name="'weaponPopover'"
      :title="'Available Weapon'"
      :data="getSelectorData(availableWeapon)"
      :updateFn="updateWeapon"
      :selectedIds="[characterWeapon._id]"
      :allowMultiSelect="false"
      :allowDeletion="true"
      :key="characterWeapon._id"
      v-if="isPopupShow"
    ></item-selector-popover>

    <item-selector-popover
      :name="'armorPopover'"
      :title="'Available Armor'"
      :data="getSelectorData(availableArmor)"
      :updateFn="updateArmor"
      :selectedIds="[characterArmor._id]"
      :allowMultiSelect="false"
      :allowDeletion="true"
      :key="characterArmor._id"
      v-if="isPopupShow"
    ></item-selector-popover>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// types
import {
  characterWeapon,
  characterArmor,
  availableWeapon,
  availableArmor,
  availableEquipment,
} from "../../@core/store/types/getterType";

import {
  updateEquipmentAction,
  removeEquipment,
} from "../../@core/store/types/actionTypes";

//components
import EquipmentStats from "./EquipmentStats";
import ItemSelectorPopover from "../../shared/component/ItemSelectorPopover";

export default {
  components: {
    "equipment-stats": EquipmentStats,
    "item-selector-popover": ItemSelectorPopover,
  },
  data() {
    return {
      isPopupShow: true,
    };
  },
  computed: {
    ...mapGetters({
      characterWeapon,
      characterArmor,
      availableWeapon,
      availableArmor,
      availableEquipment,
    }),
  },
  methods: {
    setEquipments(type) {
      console.log(type);

      // this.$confirm("", "Available Item", "", {
      //   customClass: "successMessage",
      //   html: "",
      // }).then(() => {});
    },
    setPopup() {
      this.isPopupShow = !this.isPopupShow;
    },
    getSelectorData(item) {
      return item.map((i) => ({
        _id: i.item._id,
        name: i.item.name,
        details: [
          {
            name: "Health",
            value: i.item.bonus.health,
          },
          {
            name: "Mana",
            value: i.item.bonus.mana,
          },
          {
            name: "Offense",
            value: i.item.bonus.off,
          },
          {
            name: "Defense",
            value: i.item.bonus.def,
          },
          {
            name: "Agility",
            value: i.item.bonus.agi,
          },
          {
            name: "Intelligence",
            value: i.item.bonus.int,
          },
          {
            name: "Luck",
            value: i.item.bonus.luk,
          },
        ],
      }));
    },
    updateWeapon(weapon) {
      const weaponId = weapon.items[0];
      const deletedItemIds = weapon.deletedItems;

      const updateItem = {
        weaponId,
        armorId: this.characterArmor._id,
      };
      this.updateItem(updateItem, deletedItemIds);
    },
    updateArmor(armor) {
      const armorId = armor.items[0];
      const deletedItemIds = armor.deletedItems;

      const updateItem = {
        weaponId: this.characterWeapon._id,
        armorId,
      };
      this.updateItem(updateItem, deletedItemIds);
    },
    updateItem(item, deletedItemIds) {
      this.$store
        .dispatch(updateEquipmentAction, item)
        .then()
        .catch(() => {
          this.$fire({
            title: "Server Error",
            text: "Failed to proccess your request.",
            timer: 3000,
            customClass: "errorMessage",
          });
        });
      
      deletedItemIds.forEach((i) => {
        const equipmentIds = this.availableEquipment
          .filter((weapon) => weapon.item._id == i)
          .map((w) => w._id);

        equipmentIds.forEach((id) => {
          this.$store
            .dispatch(removeEquipment, id)
            .then()
            .catch(() => {
              this.$fire({
                title: "Server Error",
                text: "Failed to proccess your request.",
                timer: 3000,
                customClass: "errorMessage",
              });
            });
        });
      });
    },
  },
};
</script>

<style scoped>
.equipment {
  height: 65% !important;
}

.equipmentBody {
  max-height: 45%;
  overflow: auto;
}

.equipment div {
  height: inherit;
}

/* div {
  height: 100% !important;
} */

table {
  height: 10vh !important;
  max-height: 15vh !important;
  overflow: auto !important;
}

img {
  height: 30px;
  widows: 30px;
}

button {
  color: #89bdaa;
  height: 20px;
  font-size: 12px;
  padding: 2px;
  border-color: transparent;
}

button:hover {
  color: #7ff7cb;
  background-color: rgba(127, 247, 203, 0.3);
}

h6 {
  color: #4a9177;
  text-shadow: 1px 1px black;
}

.vue-popover {
  width: 320px !important;
}
</style>
