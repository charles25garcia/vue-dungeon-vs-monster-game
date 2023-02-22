<template>
  <div class="container" id="messageContainer">
    <p class="typewriter">
      {{ displayMessage }}
    </p>
  </div>
</template>
<script>
import { gameBus } from "../../main.js";

export default {
  props: {
    message: String
  },
  data() {
    return {
      displayMessage: "",
      i: 0
    };
  },
  methods: {
    typeWriter() {
      this.displayMessage += this.message.charAt(this.i);
      this.i++;

      if (this.i > this.messageLegnth) {

        this.i = 0;

        setTimeout(() => {
          
          this.displayMessage = "";

          gameBus.$emit('notification', {message: "", isBusy: false});

        }, 500);

        return;
      }

      setTimeout(this.typeWriter, 70);
    },
  },
  computed: {
    messageLegnth() {
      return this.message.length;
    },
  },
  watch: {
    message() {
      this.displayMessage = "";
      this.typeWriter();
    },

  },
  mounted() {
    this.displayMessage = "";
    this.typeWriter();
  },
};
</script>
<style scoped>
#messageContainer {
  overflow: auto;
  background-color: rgba(39, 39, 39, 0.7);
  border-radius: 2px;
  background-size: 100% 100%;
  height: 100px;
  max-height: 100px;
  width: 70%;
  text-align: center;
  padding: 5%;
  color: #DDDDDD;
}

.typewriter {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  font-size: 12px;
  font-family: "Century Gothic";
  font-weight: bold;
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
}
</style>