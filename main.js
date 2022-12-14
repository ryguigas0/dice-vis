const diceSidesSelect = document.querySelector("#dice-sides")
const rollTypeSelect = document.querySelector("#roll-type")
const rollModInput = document.querySelector("#roll-modifier")
const rollQuanityInput = document.querySelector("#roll-quantity")
const graphSVG = d3.select("#graph").append("svg").attr("class", "graph")

function makeGraph() {
    let diceSides = Number.parseInt(diceSidesSelect.value)
    let rolls = rollsByQuantity(calcRolls(diceSides))

    const rollQuants = Object.values(rolls)

    const maxRollQuant = rollQuants.sort().reverse()[0]

    const maxHeight = graphSVG.property("height").baseVal.value
    const minHeight = 40
    const maxWidth = graphSVG.property("width").baseVal.value
    const barXOffset = maxWidth / (diceSides + 30)
    const barWidth = maxWidth / (Object.keys(rolls).length + 30)
    const barHeightScale = maxHeight / maxRollQuant


    let data = []

    for (let i = 0; i < Object.keys(rolls).length; i++) {
        const rollValue = Object.keys(rolls)[i];
        const rollQuant = Object.values(rolls)[i];


        data.push({
            x: (barWidth + barXOffset) * i,
            y: minHeight,
            height: rollQuant * barHeightScale,
            width: barWidth,
            rollValue: rollValue
        })
    }

    graphSVG
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("y", (d) => d.y)
        .attr("x", (d) => d.x)
        .attr("height", (d) => d.height)
        .attr("width", (d) => d.width)

    graphSVG
        .selectAll("text")
        .data(data)
        .join("text")
        .text((d) => `${d.rollValue}`)
        .attr("y", minHeight)
        .attr("x", (d) => d.x)

    // console.log({ msg: "Graph rendered!", data, rolls })
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

function calcRolls(diceSides) {
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
    return Math.floor(Math.random() * (sides - 1 + 1) + 1);
}

console.log("main.js is loaded!")
