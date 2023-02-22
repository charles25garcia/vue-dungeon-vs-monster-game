export default [
    {
        id: 0,
        name: 'Monster',
        gif: 'monster.gif',
        stats: { health: 500, mana: 90 },
        winnerGif: 'monster.gif',
        skills: [
            {
                name: "Poison",
                classId: 1,
                gif: "monster.gif",
                gifDuration: 2,
                damage: 10,
                target: 'enemy',
                cost: 15
            },
            {
                name: "Sludge",
                classId: 2,
                gif: "monster.gif",
                gifDuration: 1.5,
                damage: 20,
                target: 'enemy',
                cost: 10
            },
            {
                name: "Poison Sting",
                classId: 3,
                gif: "monster.gif",
                gifDuration: 1.5,
                damage: 15,
                target: 'enemy',
                cost: 10
            },
            {
                name: "Recover",
                classId: 3,
                gif: "monster.gif",
                gifDuration: 1.5,
                damage: -100,
                target: 'self',
                cost: 10
            }
        ]
    }
];