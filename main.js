const diceSidesSelect = document.querySelector("#dice-sides")
const rollTypeSelect = document.querySelector("#roll-type")
const rollModInput = document.querySelector("#roll-modifier")
const rollQuanityInput = document.querySelector("#roll-quantity")

function makeGraph() {
    let rolls = calcRolls()

    console.log(rolls)
}

function rollsByQuantity(rolls) {
    let dict = {}

    for (let i = 0; i < rolls.length; i++) {
        if (dict[`${rolls[i]}`] === undefined) {
            dict[`${rolls[i]}`] = 1
        } else {
            dict[`${rolls[i]}`] += 1
        }

    }

    return dict
}

function calcRolls() {
    let diceSides = Number.parseInt(diceSidesSelect.value)
    let rollType = rollTypeSelect.value
    let rollMod = Number.parseInt(rollModInput.value)
    let rollQuant = Number.parseInt(rollQuanityInput.value)

    let rolls = new Array(rollQuant)

    for (let i = 0; i < rolls.length; i++) {
        let resultRoll = rollDice(diceSides)

        if (rollType === "advantage") {
            let newRoll = rollDice(diceSides)
            resultRoll = newRoll > resultRoll ? newRoll : resultRoll
        } else if (rollType === "disadvantage") {
            let newRoll = rollDice(diceSides)
            resultRoll = newRoll < resultRoll ? newRoll : resultRoll
        }

        resultRoll += rollMod

        rolls[i] = resultRoll
    }

    return rolls
}

function rollDice(sides) {
    return Math.floor(Math.random() * (sides - 1) + 1);
}

console.log("main.js is loaded!")
