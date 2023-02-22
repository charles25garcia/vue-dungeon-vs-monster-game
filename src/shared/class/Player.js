import attackTargetType from '../../shared/freezeObject/attackTargetType';
import negativeToZero from '../functions/number/negativeToZero';

export default class Player {
  constructor(character) {
    const { name, stats, gif, winnerGif, skills, equipment, classType, _id, level } = character;
    const { weapon, armor } = equipment;

    const additionalAttribute = {
      health: weapon.bonus.health + armor.bonus.health,
      mana: weapon.bonus.mana + armor.bonus.mana,
      off: weapon.bonus.off + armor.bonus.off,
      def: weapon.bonus.def + armor.bonus.def,
      agi: weapon.bonus.agi + armor.bonus.agi,
      int: weapon.bonus.int + armor.bonus.int,
      luk: weapon.bonus.luk + armor.bonus.luk,
    };

    const { mana, health } = stats;
    this.baseGifUrl = character.baseGifUrl;
    this.name = name;
    this.level = level;
    this._id = _id;
    this.defaultGif = gif;
    this.winnerGif = winnerGif;
    this.isBusy = false;
    this.isAlreadyAttacked = false;
    this.chanceToAvoidAttack = [];
    this.chanceToCriticalAttack = [];
  
    const numberOfAvoidChance = 100 * (stats.agi / 1000);
    const numberOfLuckChance = stats.luk * 50;

    for (let index = 0; index < 100; index++) {
      this.chanceToAvoidAttack.push(numberOfAvoidChance > index);
    }

    for (let index = 0; index < 100; index++) {
      this.chanceToCriticalAttack.push(numberOfLuckChance > index);
    }

    //stats
    this.totalMana = mana;
    this.totalHp = health;
    this.hp = health;
    this.mana = mana;
    this.offenses = stats.off;
    this.defense = stats.def;
    this.agility = stats.agi;
    this.intelligence = stats.int;
    this.luck = stats.luk;

    this.gif = `${this.baseGifUrl}${this.defaultGif}`;

    this.offenses = skills.concat([
      {
        name: "Attack",
        classId: classType,
        gif: character.gif,
        gifDuration: 1.5,
        damage: 80,
        target: 'enemy',
        log: "used Attack and deals 80 damage.",
        type: "P",
        cost: 15
      },
      {
        name: "Focus",
        classId: classType,
        gif: character.gif,
        gifDuration: 1.5,
        damage: 0,
        type: "M",
        target: 'enemy',
        log: `used Focus to regain ${(stats.int + additionalAttribute.int) * 0.75} mana.`,
        cost: ((stats.int + additionalAttribute.int) * 0.75) * -1
      }
    ]).map((skill) => {
      const utilDamage = skill.type == "P" ? (additionalAttribute.off || 0) + stats.off : (additionalAttribute.int || 0) + stats.int;

      const totalDamage = attackTargetType.enemy == skill.target ? Math.round(utilDamage * (skill.damage / 100)) : skill.damage;

      const log = attackTargetType.enemy == skill.target ? `used ${skill.name} and deals ${totalDamage} damage.` : `used ${skill.name} and recover ${Math.abs(totalDamage)} HP.`;
     
      return ({
        name: skill.name,
        classId: skill.classId,
        gif: gif,
        gifDuration: 2,
        damage: totalDamage,
        target: skill.target,
        log: skill.name == "Focus" ? `used Focus to regain ${(stats.int + additionalAttribute.int) * 0.75} mana.` : log,
        mana: skill.cost
      })
    });
    // console.log(this.offenses)

    this.actions = [
      ...this.offenses,
    ];
  }

  get hpPercent() {
    return Math.round((this.hp / this.totalHp) * 100);
  }

  get manaPercent() {
    return Math.round((this.mana / this.totalMana) * 100);
  }

  avoidIncommingAttack() {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(this.chanceToAvoidAttack.length)
    );

    return this.chanceToAvoidAttack[randomIndex];
  }

  criticalAttack() {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(this.chanceToCriticalAttack.length)
    );

    return this.chanceToCriticalAttack[randomIndex];
  }

  receiveDamage(damage, canAvoid, attackWithCritical) {

    const finalDamage = attackWithCritical ? (damage * 1.5) : damage;

    if (!canAvoid) {
      const blockDamage = Math.round(finalDamage * (this.defense / 1000));

      const damageWithDefense = (finalDamage - blockDamage);

      this.hp = negativeToZero(this.hp - damageWithDefense);
      return blockDamage;
    }
    else {
      return 0;
    }


  }

  receiveHeal(damage) {
    const hp = negativeToZero(this.hp - damage);

    this.hp = this.totalHp < hp ? this.totalHp : hp;
  }



  temporaryChangeGif(offense) {
    const { gif, gifDuration } = offense;
    this.gif = `${this.baseGifUrl}${gif}`;
    this.isBusy = true;
    setTimeout(() => this.setGifToDefault(), gifDuration * 1000);
  }

  setGifToDefault() {
    this.gif = `${this.baseGifUrl}${this.defaultGif}`;
    this.isBusy = false;
    this.isAlreadyAttacked = true;
  }

  setGifToWin() {
    this.gif = `${this.baseGifUrl}${this.winnerGif}`;
  }

  generateRandomAction() {

    const actions = this.actions.concat(this.actions.filter(i => i.name != "Focus"));
    const randomIndex = Math.floor(
      Math.random() * Math.floor(actions.length)
    );


    let action = actions[randomIndex];

    if (this.mana < action.mana) {
      action = this.actions.filter(i => i.name == "Focus");
    }
    return action;
  }

  // generateRandomOffenseAction() {
  //   const randomIndex = Math.floor(
  //     Math.random() * Math.floor(this.offenses.length)
  //   );
  //   const offense = this.offenses[randomIndex];
  //   return offense;
  // }
}