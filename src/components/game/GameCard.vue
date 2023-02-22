<template>
  <div>
    <div class="container" align="center">
      <div
        class="container gameCard"
        :style="{
          backgroundImage: `url('../dungeon/${ gameData.dungeon ? gameData.dungeon.image : ''}.gif')`,
        }"
      >
        <div class="row" id="statusRow">
          <div id="colStatusPlayer" class="col-md">
            <app-health-bar
              :hpPercent="player1.hpPercent"
              :hp="player1.hp"
            ></app-health-bar>
            <app-mana-bar
              :manaPercent="player1.manaPercent"
              :mana="player1.mana"
            ></app-mana-bar>
            <span class="labelPlayer">{{ player1.name }}</span>
            <span class="labelPlayer">Level: {{ player1.level }}</span>
          </div>
          <div id="colStatusEnemy" class="col-md">
            <app-health-bar
              :hpPercent="player2.hpPercent"
              :hp="player2.hp"
            ></app-health-bar>
            <app-mana-bar
              :manaPercent="player2.manaPercent"
              :mana="player2.mana"
            ></app-mana-bar>
            <span class="labelPlaye2">{{ player2.name }}</span>
            <span class="labelPlaye2">Level: {{ player2.level }}</span>
          </div>
        </div>
        <div class="row">
          <app-nitification-bar :message="notification.message">
          </app-nitification-bar>
        </div>
        <div class="row" id="characterRow">
          <div id="colCharacterPlayer" class="col-md">
            <br />
            <app-character :characterImage="player1.gif"></app-character>
          </div>
          <div id="colCharacterEnemy" class="col-md">
            <br />
            <app-character
              :characterImage="player2.gif"
              :class="'player2'"
            ></app-character>
          </div>
        </div>
        <div class="w-100">
          <button
            v-for="offense in player1.actions"
            :key="offense.name"
            @click="clickAttack(offense)"
            class="btn"
            :class="'btn-dark btn-sm'"
            :disabled="
              game.isEnd ||
              game.isDraw ||
              notification.isBusy ||
              isActionNotCompleted ||
              player1.mana < offense.mana
            "
          >
            {{ offense.name }}
            {{ offense.mana > 0 ? `(${offense.mana} mana)` : "" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

// types
import attackTargetType from "../../shared/freezeObject/attackTargetType";
import { character, gameData } from "../../@core/store/types/getterType";
import {
  setDungeonId,
  setGameData,
} from "../../@core/store/types/mutationTypes";
import { sendWinTheGameAction,  getDungeonAction } from "../../@core/store/types/actionTypes";

// mixin
import GameMixin from "../../shared/mixin/GameMixin";

import characterComponent from "./Character.vue";
import { gameBus } from "../../main.js";
import healthBar from "./HealthBar.vue";
import manaBar from "./ManaBar.vue";
import notificationBar from "./NotificationBar.vue";
import Player from "../../shared/class/Player.js";

// Function
import negativeToZero from "../../shared/functions/number/negativeToZero";

export default {
  components: {
    "app-health-bar": healthBar,
    "app-mana-bar": manaBar,
    "app-character": characterComponent,
    "app-nitification-bar": notificationBar,
  },
  data() {
    return {
      player1: {},
      player2: {},
      game: {
        isEnd: false,
        isDraw: false,
        winner: null,
      },
      notification: {
        message: "",
        isBusy: false,
      },
      isActionNotCompleted: false,
    };
  },
  mixins: [GameMixin],
  methods: {
    clickAttack(offense) {
      const { mana } = this.player1;

      this.isActionNotCompleted = true;

      if (mana < offense.mana) {
        gameBus.$emit("notification", {
          message: `${offense.name} attack need ${offense.mana} mana.`,
          isBusy: true,
        });
        this.player1.isAlreadyAttacked = true;
        return;
      }
      const result = this.getActionResult(offense, this.player1, this.player2);

      this.player1 = result.player;
      this.player2 = result.enemy;

      this.gameChecker();

      this.player1.temporaryChangeGif(offense);
      // this.game.isEnd = true;
    },
    gameChecker() {
      const isEnd = this.player1.hpPercent == 0 || this.player2.hpPercent == 0;
      let winner = null;

      if (isEnd && this.player1.hpPercent > this.player2.hpPercent)
        winner = this.player1;
      else winner = this.player2;

      this.game = {
        ...this.game,
        isEnd,
        winner,
        isDraw: isEnd && this.player1.hp == this.player2.hp,
      };
    },
    getActionResult(action, player, enemy) {
      const { mana, target, damage, log } = action;

      player.mana = negativeToZero(player.mana - mana);
      player.mana =
        player.mana > player.totalMana ? player.totalMana : player.mana;

      let blockDamage = 0;

      const isIncommingAttackMissed = enemy.avoidIncommingAttack();
      let attackWithCritical = false;

      if (attackTargetType.enemy == target) {
        attackWithCritical = enemy.criticalAttack();
        blockDamage = enemy.receiveDamage(
          damage,
          isIncommingAttackMissed,
          attackWithCritical
        );
      } else {
        player.receiveHeal(damage);
      }

      const additionalLog =
        attackTargetType.enemy == target && blockDamage > 0
          ? `\n${enemy.name} block ${blockDamage} damage.`
          : "";
      const criticalLog =
        attackWithCritical && !isIncommingAttackMissed && blockDamage > 0
          ? "Critical Attack Additional 50% of damage! "
          : " ";

      const finalLog =
        isIncommingAttackMissed && blockDamage > 0
          ? " attack missed."
          : `${log} ${additionalLog}`;

      gameBus.$emit("notification", {
        message: `${criticalLog}${player.name} ${finalLog}`,
        isBusy: true,
      });

      return {
        player,
        enemy,
      };
    },
    restartGame() {
      const { enemy } = this.gameData;

      this.game = {
        isEnd: false,
        isDraw: false,
        winner: null,
      };

      this.notification = {
        message: "",
        isBusy: false,
      };

      this.isActionNotCompleted= false;

      gameBus.$on("notification", (notification) => {
        this.notification = notification;
      });

      const gif = this.getGifFromClassType(this.character.classType);

      this.player1 = new Player({
        ...this.character,
        gif,
        winnerGif: gif,
        baseGifUrl: "./character/Player/",
      });

      this.player2 = new Player({
        ...enemy,
        gif: `${enemy._id}.gif`,
        baseGifUrl: "./enemies/",
        equipment: {
          weapon: {
            bonus: {
              health: 0,
              mana: 0,
              off: 0,
              def: 0,
              agi: 0,
              int: 0,
              luk: 0,
            },
          },
          armor: {
            bonus: {
              health: 0,
              mana: 0,
              off: 0,
              def: 0,
              agi: 0,
              int: 0,
              luk: 0,
            },
          },
        },
      });
    },
    ...mapMutations(["setIsWebBusy"]),
  },
  computed: {
    ...mapGetters({
      character,
      gameData,
    }),
    isNextAttack() {
      return this.player1.isAlreadyAttacked && !this.notification.isBusy;
    },
  },
  watch: {
    game() {
      if (this.game.isEnd) {
        setTimeout(() => {
          // this.game.winner?.setGifToWin();
          if (!this.game.isDraw) {
            this.$store
              .dispatch(sendWinTheGameAction, this.gameData.enemy._id)
              .then(({ data }) => {
                const isLostGame = this.game.winner._id != this.character._id;

                let bodyMessage = "";

                if (!isLostGame) {
                  bodyMessage = ` <div class="winnerConnent">
                  <h6>You Win!</h6>
                                  ${
                                    data.lvlUp
                                      ? "<label>Level Up!</label><br>"
                                      : ""
                                  }
                                  <label>Exp: ${data.exp}</label><br>
                                  ${
                                    data.drop && data.drop != ""
                                      ? `<label>Item: ${data.drop} </label><br>`
                                      : ""
                                  }
                                  `;

                  let newSkills = "";

                  data.newSkills.forEach((i) => {
                    newSkills += `${i} | `;
                  });

                  let newDungeon = "";

                  data.unlockedDungeons.forEach((d) => {
                    newDungeon += `${d} | `;
                  });
                  bodyMessage +=
                    newSkills != ""
                      ? `<lable>New Skill: ${newSkills}</label><br>`
                      : "";
                  bodyMessage +=
                    newDungeon != ""
                      ? `<lable>New Dungeon: ${newDungeon}</label><br>`
                      : "";

                  bodyMessage += "</div>";
                }
                this.$confirm("", "Do you want to re-enter this dungeon?", "info", {
                  html: bodyMessage,
                })
                  .then(() => {
                    this.$store.dispatch(getDungeonAction,this.gameData.dungeon._id)
                    .then(() => this.restartGame());
                  })
                  .catch(() => {
                    this.$router.push("/dungeon");
                  });
              });
          }
        }, 3500);
      }
    },
    isNextAttack() {
      if (!this.isNextAttack || this.game.isEnd) return;
      setTimeout(() => {
        const player2Offense = this.player2.generateRandomAction();

        if (player2Offense.mana < player2Offense.mana) {
          gameBus.$emit("notification", {
            message: `${player2Offense.name} attack need ${player2Offense.mana} mana.`,
            isBusy: true,
          });
          return;
        }

        const result = this.getActionResult(
          player2Offense,
          this.player2,
          this.player1
        );

        this.player2 = result.player;
        this.player1 = result.enemy;

        this.gameChecker();

        this.player2.temporaryChangeGif(player2Offense);

        this.player1.isAlreadyAttacked = false;

        this.isActionNotCompleted = false;
      }, 700);
    },
  },
  created() {
    this.restartGame();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != "login" && !this.game.isEnd) {
      this.$confirm(
        `Are you sure you want to leave ${from.name}?`,
        "Confirmation",
        "warning",
        {
          customClass: "warningMessage",
        }
      )
        .then(() => {
          this.$store.commit(setDungeonId, null);
          this.$store.commit(setGameData, {});
          next();
        })
        .catch(() => {});
    } else {
      next();
    }
  },
};
</script>

<style scoped>
.gameCard {
  padding-top: 5px;
  background-size: 100% 100%;
  height: 80vh;
  background-repeat: no-repeat;
  width: 100%;
  border: solid #27471d;
}

/* img {
  position:absolute;
  z-index: -1;
} */

.btn {
  margin-left: 1%;
  margin-top: 2px;
}
.labelPlayer {
  color: #d8e3e3;
  font-size: 12px;
  padding: 2px;
  font-family: "Century Gothic";
  background-color: rgba(39, 39, 39, 0.7);
}

.labelPlaye2 {
  color: black;
  font-size: 12px;
  padding: 2px;
  font-family: "Century Gothic";
  background-color: #d8e3e3;
}

#statusRow {
  height: 15%;
}

#characterRow {
  height: 70%;
}

.loading {
  margin: 28% 0% 0% 45.5%;
}
</style>