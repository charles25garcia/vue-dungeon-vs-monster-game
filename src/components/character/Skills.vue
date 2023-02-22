<template>
  <div class="skills">
    <h5>
      Skills
      <button
        v-popover:skillPopover.bottom
        class="btn btn btn-default btn-sm btn-secondary"
      >
        <font-awesome-icon icon="exchange-alt" />
      </button>
    </h5>

    <table>
      <thead>
        <th></th>
        <th>Skill</th>
        <th>mana</th>
        <th>Damage</th>
        <th>Type</th>
        <th>Target</th>
      </thead>
      <tbody>
        <tr>
          <td class="noRecord" colspan="6" v-if="characterSkills.length < 1">
            No Skills..
          </td>
        </tr>
        <tr v-for="skill in characterSkills" :key="skill.id">
          <td>
            <font-awesome-icon
              :icon="skill.type | skillTypeFaIcon"
              :color="skill.type | skillTypeColor"
            />
          </td>
          <td>
            {{ skill.name }}
          </td>
          <td>
            {{ skill.cost }}
          </td>
          <td>
            {{ skill.damage }}
          </td>
          <td>
            {{ skill.type | skillTypeWord }}
          </td>
          <td>
            {{ skill.target }}
          </td>
        </tr>
      </tbody>
    </table>
    <item-selector-popover
      :name="'skillPopover'"
      :title="'Available Skills'"
      :data="skillSelectorData"
      :updateFn="updateActiveSkill"
      :selectedIds="currentSkillIds"
      :allowMultiSelect="true"
      :key="currentSkillIds.length + skillSelectorData.length"
    ></item-selector-popover>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// types
import {
  characterSkills,
  availableSkills,
} from "../../@core/store/types/getterType";

import { updateCharacterSkillsAction } from "../../@core/store/types/actionTypes";

// component
import ItemSelectorPopover from "../../shared/component/ItemSelectorPopover";

export default {
  components: {
    "item-selector-popover": ItemSelectorPopover,
  },
  data() {
    return {
      isPopupShow: true,
    };
  },
  methods: {
    setPopup() {
      this.isPopupShow = !this.isPopupShow;
    },
    updateActiveSkill(skillIds) {
      if (skillIds.length > 4) {
        this.$fire({
              title: "Invalid Skills",
              text: "Please select maximum of 4 skills.",
              timer: 3000,
              customClass: "warningMessage",
            });
      } else {
        this.$store
          .dispatch(updateCharacterSkillsAction, skillIds)
          .catch(() => {
            this.$fire({
              title: "Server Error",
              text: "Failed to proccess your request.",
              timer: 3000,
              customClass: "errorMessage",
            });
          });
      }
    },
  },
  computed: {
    ...mapGetters({ characterSkills, availableSkills }),
    skillSelectorData() {
      return this.availableSkills.map((i) => ({
        _id: i._id,
        name: i.name,
        details: [
          {
            name: "Damage",
            value: i.damage,
          },
          {
            name: "Cost",
            value: i.cost,
          },
          {
            name: "Type",
            value: i.type,
          },
          {
            name: "Target",
            value: i.target,
          },
        ],
      }));
    },
    currentSkillIds() {
      return this.characterSkills.map((skill) => skill._id);
    },
  },
};
</script>

<style scoped>
.skills {
  height: 35% !important;
  overflow: auto;
}

table th {
  text-align: start;
  color: #4a9177;
  text-shadow: 1px 1px black;
  padding-bottom: 2px;
}

table td {
  font-size: 14px;
}

h6 {
  color: #4a9177;
  text-shadow: 1px 1px black;
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

div.btnUpdate {
  color: #46ffbb;
  font-size: 16px;
  border-radius: 7px;
}

td.noRecord {
  text-align: center;
}
</style>