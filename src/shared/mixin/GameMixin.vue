<script>
export default {
  methods: {
    getGifFromClassType: (classId) => {
      switch (classId) {
        case 1:
          return "saber.gif";
        case 2:
          return "archer.gif";
        case 3:
          return "lancer.gif";
        case 4:
          return "berserker.gif";
        case 5:
          return "caster.gif";
        default:
          return "";
      }
    },
  },
};
</script>
 