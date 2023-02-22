

export default {
    player1: {
        offense: [
            {
                name: "Spin",
                class: "primary",
                gif: "player1-spin.gif",
                gifDuration: 2,
                damage: 15,
                log: "used Spin and deals 15 damage.",
                mana: 10
            },
            {
                name: "Attack",
                class: "success",
                gif: "player1-spin-punch.gif",
                gifDuration: 1.5,
                damage: 10,
                log: "used Attack and deals 10 damage.",
                mana: 15
            },
            {
                name: "Combo",
                class: "danger",
                gif: "player1-combo.gif",
                gifDuration: 3,
                damage: 30,
                log: "used Combo and deals 30 damage.",
                mana: 15
            },
            {
                name: "Self Confuse",
                class: "warning",
                gif: "player1-confuse.gif",
                gifDuration: 2,
                damage: 0,
                log: "used Self Confuse.",
                mana: 5
            },
            {
                name: "Focus",
                class: "secondary",
                gif: "player1-recharge.gif",
                gifDuration: 1.5,
                damage: 0,
                log: "used Focus to regain 20 mana.",
                mana: -20
            }
        ]
    },
    player2: {
        offense: [
            {
                name: "Attack",
                class: "primary",
                gif: "player2-spinning-kick.gif",
                gifDuration: 2.5,
                damage: 10,
                log: "used Attack and deals 10 damage.",
                mana: 10
            },
            {
                name: "Tackle",
                class: "success",
                gif: "player2-tackle.gif",
                gifDuration: 1.5,
                damage: 20,
                log: "used Tackle and deals 20 damage.",
                mana: 15
            },
            {
                name: "Stronge Tackle",
                class: "danger",
                gif: "player2-stronge-tackle.gif",
                gifDuration: 5,
                damage: 25,
                log: "used Stronge Tackle and deals 25 damage.",
                mana: 15
            },
            {
                name: "Flying Tackle",
                class: "warning",
                gif: "player2-flying-tackle.gif",
                gifDuration: 1.5,
                damage: 20,
                log: "used Flying Tackle and deals 20 damage.",
                mana: 15
            },
            {
                name: "Focus",
                class: "secondary",
                gif: "player2-recharge.gif",
                gifDuration: 2.2,
                damage: 0,
                log: "used Focus to regain 20 mana.",
                mana: -20
            }
        ]
    }
};