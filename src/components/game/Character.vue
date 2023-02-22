<template>
  <div
    class="container"
    id="characterContainer"
  >
    <img
      :src="characterImage"
      alt="Trulli"
    />
  </div>
</template>
<script>
export default {
  props: {
    characterImage: String,
  },
};
</script>

<style scoped>
#characterContainer {
  /* background-image: url("../../assets/character/Player2/player2.gif"); */
  background-repeat: no-repeat;
  height: 60%;
  width: 60%;
  margin-left: 0%;
}

img {
  width: 80%;
  height: 90%;
  margin-top: 30%;
}

.player2 {
  margin-left: 45% !important;
}
</style>