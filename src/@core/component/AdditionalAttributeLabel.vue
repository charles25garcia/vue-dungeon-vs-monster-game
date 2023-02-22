<template>
  <label v-if="attrValue > 0">+{{ attrValue }}</label>
  <label v-else-if="attrValue < 0" class="negative">{{ attrValue }}</label>
</template>

<script>
export default {
    props: ['attrValue']
}
</script>
<style scoped>
label {
  font-size: 10px;
  color: green;
}

label.negative {
  color: red;
}
</style>
