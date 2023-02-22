<template>
  <popover :name="name">
    <div class="container">
      <h5>
        {{ title }}
      </h5>
      <label v-show="items.length == 0"> No {{ title }}... </label>
      <div class="popoverContent">
        <div
          class="popoverItem"
          v-for="(item, i) in items"
          :key="i"
          delay="1000"
          v-show="!item.isDeleted"
          :class="{ active: item.isSelect }"
        >
          <font-awesome-icon @click="onItemClick(item)" icon="check" />

          <label
            @mouseenter="onItemHover(item)"
            @mouseleave="onItemHover(item)"
            >{{ item.name }}</label
          >
          <font-awesome-icon
            icon="trash-alt"
            class="deleteIcon"
            v-if="allowDeletion"
            @click="onDelete(i)"
          />

          <div class="itemDetails" v-if="item.isHover">
            <table>
              <tr>
                <th v-for="(detail, i) in item.details" :key="i">
                  {{ detail.name }}
                </th>
              </tr>
              <tr>
                <td v-for="(detail, i) in item.details" :key="i">
                  {{ detail.value }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <br />
      <div class="popoverItem btn" @click="refresh()">
        <font-awesome-icon icon="sync-alt" />
      </div>
      <div class="popoverItem btn" @click="onUpdate()">Update</div>
    </div>
  </popover>
</template>
<script>
export default {
  props: [
    "data",
    "title",
    "updateFn",
    "name",
    "selectedIds",
    "allowMultiSelect",
    "allowDeletion",
  ],
  data() {
    return {
      items: [],
      isAllowMultiSelect: false,
      isAllowDeletion: false,
    };
  },
  methods: {
    onUpdate() {
      const items = this.items
        .filter((i) => i.isSelect && !i.isDeleted)
        .map((itm) => itm._id);

      if (items.length < 1) {
        this.$fire({
          title: "No Selected Item",
          text: "Please select item.",
          timer: 3000,
          customClass: "warningMessage",
        });

        return;
      }

      let returnValue = {};
      if (this.allowDeletion) {
        returnValue = {
          items,
          deletedItems: this.items
            .filter((i) => i.isDeleted)
            .map((itm) => itm._id),
        };
      } else returnValue = items;

      this.updateFn(returnValue);
    },
    onItemClick(item) {
      const { isSelect } = item;

      this.items.forEach((i) => {
        i.isSelect = !this.isAllowMultiSelect ? false : i.isSelect;
      });

      item.isSelect = !isSelect;
    },
    onItemHover(item) {
      item.isHover = !item.isHover;
    },
    onDelete(index) {
      this.items[index].isDeleted = true;
    },
    refresh() {
      this.items = this.data.map((i) => ({
        ...i,
        isSelect: this.selectedIds.includes(i._id),
        isHover: false,
        isDeleted: false,
      }));
    },
  },
  created() {
    this.isAllowMultiSelect = this.allowMultiSelect ? true : false;
    this.isAllowDeletion = this.allowDeletion ? true : false;

    this.refresh();

    if (this.selectedIds.length > 1 && !this.isAllowMultiSelect) {
      throw "selectedIds must contain one id.";
    }
  },
};
</script>
<style scoped>
div.btn {
  color: #3d7a63;
  font-size: 16px;
  background-color: #2d3e35;
  margin-top: 1px ;
}

div.btn:hover {
  color: #46ffbb;
}

div.btn svg {
  float: none !important;
}

.popoverContent {
  max-height: 250px;
  max-height: 250px;
  overflow: auto;
}

.popoverItem {
  display: inline-table;
  width: 100%;
  max-width: 300%;
  padding: 2px;
}

.popoverItem svg {
  float: left !important;
  color: #426357;
}

.popoverItem svg:hover {
  color: #259670 !important;
}

.popoverItem.active {
  color: #205443;
  background-color: #397564;
}

.popoverItem.active svg {
  color: #2ec447;
}

.popoverItem .itemDetails {
  font-size: 11px;
  display: inline-block;
}

.popoverItem .itemDetails table {
  color: #7ad6b6;
  text-shadow: 1px 1px #071a14;
}

.popoverItem .deleteIcon {
  float: right !important;
  color: #968484 !important;
}

.popoverItem .deleteIcon:hover {
  color: #990f0f !important;
}
</style>
