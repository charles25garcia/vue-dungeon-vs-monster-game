<template>
  <div class="progress" style="height: 10px; margin-top: 2px">
    <div
      class="progress-bar bg-info"
      role="progressbar"
      :style="{width: manaPercent + '%'}"
      aria-valuenow="manaPercent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {{mana}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    manaPercent: Number,
    mana: Number
  }
}
</script>