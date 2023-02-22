<template>
  <div class="progress">
    <div
      class="progress-bar bg-success progress-bar-animated"
      role="progressbar"
      :class="hpClass"
      :style="{ width: hpPercent + '%' }"
      aria-valuenow="hpPercent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {{ hp }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hpPercent: Number,
    hp: Number
  },
  data() {
    return {};
  },
  computed: {
    hpClass() {
      const { hpPercent } = this;

      if (hpPercent <= 20) return "bg-danger";
      else if (hpPercent > 20 && hpPercent <= 50) return "bg-warning";

      return "bg-success";
    },
  },
};
</script>