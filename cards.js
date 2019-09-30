let buildingNames = [
    "Unexpected card generation", //0
    "Office Building", //1
    "Coffee Shop", //2
    "Luxury Goods", //3
    "Small Factory", //4
    "Condos", //5
    "High Rise", //6
    "Factory", //7
    "Small Office", //8
    "Office Park", //9
    "Postal Store", //10
    "Corner Store", //11
    "Tech Factory",  //12
    "Office Building", //13
    "Office Building", //14
    "Corner Office", //15
    "Bank", //16
    "Medical Offices", //17
    "Uptown Offices", //18
    "Corporation", //19
    "Highrise", //20
    "Small Office", //21
    "Fancy House", //22
    "Unexpected card generation", //23
]

let borderColors = [
    "blue",
    "green",
    "black",
    "red",
    "yellow",
    "white"
]

let buildingCardCount = 22;

function getRedCardObject(cardNumber,noun,adjective) {
    ytopia.random.ensureSeedSet(ytopia.storage.getSeedArray("cards"));
    ytopia.random.skip(cardNumber);

    let upImage = ytopia.random.integer(1,buildingCardCount);
    let downImage = ytopia.random.integer(1,buildingCardCount);
    let bits = [...Array(8)].map((x,i)=>cardNumber>>i&3)
    let cardObject = {
        borderColor: "red", //borderColors[cardNumber % 6],
        noun,
        adjective,
        up: {
            cost: {
                yellow: ytopia.random.integer(0,bits[0]),
                red: ytopia.random.integer(0,bits[1]),
                black: ytopia.random.integer(0,bits[2]),
                blue: ytopia.random.integer(0,bits[3]),
                green: ytopia.random.integer(0,bits[4]),
                white: ytopia.random.integer(0,bits[5])
            },
            image: "buildings/b" + upImage,
            name: buildingNames[upImage],
            drawCount: ytopia.random.integer(-bits[4],bits[4]),
            healthCount: ytopia.random.integer(-bits[5],bits[5]),
            moveCount: ytopia.random.integer(-bits[6],bits[6]),
            ownerCount: ytopia.random.integer(-bits[7],bits[7])
        },
        down: {
            cost: {
                yellow: ytopia.random.integer(0,bits[0]),
                red: ytopia.random.integer(0,bits[1]),
                black: ytopia.random.integer(0,bits[2]),
                blue: ytopia.random.integer(0,bits[3]),
                green: ytopia.random.integer(0,bits[4]),
                white: ytopia.random.integer(0,bits[5])
            },
            image: "buildings/b" + downImage,
            name: buildingNames[downImage],
            drawCount: ytopia.random.integer(-bits[4],bits[4]),
            healthCount: ytopia.random.integer(-bits[5],bits[5]),
            moveCount: ytopia.random.integer(-bits[6],bits[6]),
            ownerCount: ytopia.random.integer(-bits[7],bits[7])
        }
    }
    
    //console.log(cardObject);
    return cardObject;
}

let peopleCardCount = 124;

function getBlueCardObject(cardNumber,noun,adjective) {
    ytopia.random.ensureSeedSet(ytopia.storage.getSeedArray("cards"));
    ytopia.random.skip(cardNumber);

    let upImage = ytopia.random.integer(1,buildingCardCount);
    let downImage = ytopia.random.integer(1,peopleCardCount);
    let bits = [...Array(8)].map((x,i)=>cardNumber>>i&3)
    let cardObject = {
        borderColor: "blue", //borderColors[cardNumber % 6],
        noun,
        adjective,
        up: {
            cost: {
                yellow: ytopia.random.integer(0,bits[0]),
                red: ytopia.random.integer(0,bits[1]),
                black: ytopia.random.integer(0,bits[2]),
                blue: ytopia.random.integer(0,bits[3]),
                green: ytopia.random.integer(0,bits[4]),
                white: ytopia.random.integer(0,bits[5])
            },
            image: "buildings/b" + upImage,
            name: buildingNames[upImage],
            drawCount: ytopia.random.integer(-bits[4],bits[4]),
            healthCount: ytopia.random.integer(-bits[5],bits[5]),
            moveCount: ytopia.random.integer(-bits[6],bits[6]),
            ownerCount: ytopia.random.integer(-bits[7],bits[7])
        },
        down: {
            cost: {
                yellow: ytopia.random.integer(0,bits[0]),
                red: ytopia.random.integer(0,bits[1]),
                black: ytopia.random.integer(0,bits[2]),
                blue: ytopia.random.integer(0,bits[3]),
                green: ytopia.random.integer(0,bits[4]),
                white: ytopia.random.integer(0,bits[5])
            },
            image: "people/p" + downImage,
            name: buildingNames[downImage],
            drawCount: ytopia.random.integer(-bits[4],bits[4]),
            healthCount: ytopia.random.integer(-bits[5],bits[5]),
            moveCount: ytopia.random.integer(-bits[6],bits[6]),
            ownerCount: ytopia.random.integer(-bits[7],bits[7])
        }
    }
    
    //console.log(cardObject);
    return cardObject;
}

function generateDoubleBoxElement(card) {
    let template = `<div class="bounding ${card.borderColor}">
        <div class="colored-border"></div>
        <div class="icon-image icon-image-corner icon-image-tl"></div>
        <div class="icon-image icon-image-corner icon-image-tr"></div>
        <div class="icon-image icon-image-corner icon-image-ll"></div>
        <div class="icon-image icon-image-corner icon-image-lr"></div>
        <div class="lefttext innerbox">${card.adjective}</div>
        <div class="righttext innerbox">${card.noun}</div>

        ${(()=>{if (card.up.cost) { return `<div class="card-cost card-cost-up">`} else {return ``}})()}
            ${(()=>{ if (card.up.cost && card.up.cost.yellow && card.up.cost.yellow > 0) {return `${card.up.cost.yellow}<span class="icon-image yellow"></span>`} else {return ``}})()}
            ${(()=>{ if (card.up.cost && card.up.cost.red && card.up.cost.red > 0) {return `${card.up.cost.red}<span class="icon-image red"></span>`} else {return ``}})()}
            ${(()=>{ if (card.up.cost && card.up.cost.black && card.up.cost.black > 0) {return `${card.up.cost.black}<span class="icon-image black"></span>`} else {return ``}})()}
            ${(()=>{ if (card.up.cost && card.up.cost.blue && card.up.cost.blue > 0) {return `${card.up.cost.blue}<span class="icon-image blue"></span>`} else {return ``}})()}
            ${(()=>{ if (card.up.cost && card.up.cost.green && card.up.cost.green > 0) {return `${card.up.cost.green}<span class="icon-image green"></span>`} else {return ``}})()}
            ${(()=>{ if (card.up.cost && card.up.cost.white && card.up.cost.white > 0) {return `${card.up.cost.white}<span class="icon-image white"></span>`} else {return ``}})()}
        ${(()=>{if (card.up.cost) { return `</div>">`} else {return ``}})()}
        <div class="half-up innerbox">
            <div class="half-template">
                <img src="images/${card.up.image}.png" class="main-half" />
                <div class="stats-template">
                    <p class="card-name">${card.up.name}</p>
                    <p><img src="images/draw${card.up.drawCount}.png" class="icon-image draw-stat"><img src="images/move${card.up.moveCount}.png" class="icon-image  move-stat"></p>
                    <p><img src="images/health${card.up.healthCount}.png" class="icon-image health-stat"><img src="images/owner${card.up.ownerCount}.png" class="icon-image owner-stat"></p>
                </div>
            </div>
        </div>

        ${(()=>{if (card.down.cost) { return `<div class="card-cost card-cost-down">`} else {return ``}})()}
            ${(()=>{ if (card.down.cost && card.down.cost.yellow && card.down.cost.yellow > 0) {return `${card.down.cost.yellow}<span class="icon-image yellow"></span>`} else {return ``}})()}
            ${(()=>{ if (card.down.cost && card.down.cost.red && card.down.cost.red > 0) {return `${card.down.cost.red}<span class="icon-image red"></span>`} else {return ``}})()}
            ${(()=>{ if (card.down.cost && card.down.cost.black && card.down.cost.black > 0) {return `${card.down.cost.black}<span class="icon-image black"></span>`} else {return ``}})()}
            ${(()=>{ if (card.down.cost && card.down.cost.blue && card.down.cost.blue > 0) {return `${card.down.cost.blue}<span class="icon-image blue"></span>`} else {return ``}})()}
            ${(()=>{ if (card.down.cost && card.down.cost.green && card.down.cost.green > 0) {return `${card.down.cost.green}<span class="icon-image green"></span>`} else {return ``}})()}
            ${(()=>{ if (card.down.cost && card.down.cost.white && card.down.cost.white > 0) {return `${card.down.cost.white}<span class="icon-image white"></span>`} else {return ``}})()}
        ${(()=>{if (card.down.cost) { return `</div>">`} else {return ``}})()}
        <div class="half-down innerbox">
            <div class="half-template">
                <img src="images/${card.down.image}.png" class="main-half" />
                <div class="stats-template">
                    <p class="card-name">${card.down.name}</p>
                    <p><img src="images/draw${card.down.drawCount}.png" class="icon-image draw-stat"><img src="images/move${card.down.moveCount}.png" class="icon-image  move-stat"></p>
                    <p><img src="images/health${card.down.healthCount}.png" class="icon-image health-stat"><img src="images/owner${card.down.ownerCount}.png" class="icon-image owner-stat"></p>
                </div>
            </div>
        </div>
    </div>`

    let markupItem = document.createElement("div");
    markupItem.classList.add("outside-cutting-wrapper");
    markupItem.innerHTML = template;
    return markupItem;
}

function createRedCard(cardNumber, noun, adjective) {
    let cardObject = getRedCardObject(cardNumber,noun,adjective);

    let markupItem = generateDoubleBoxElement(cardObject);
    let container = document.getElementById("card-list-container");
    while(container.firstChild) { container.removeChild(container.firstChild); }
    container.appendChild(markupItem);
}

function createBlueCard(cardNumber, noun, adjective) {
    let cardObject = getBlueCardObject(cardNumber,noun,adjective);

    let markupItem = generateDoubleBoxElement(cardObject);
    let container = document.getElementById("card-list-container");
    while(container.firstChild) { container.removeChild(container.firstChild); }
    container.appendChild(markupItem);
}

function createWhiteCard(cardNumber, noun, adjective) {
    let cardObject = getRedCardObject(cardNumber,noun,adjective);

    cardObject.borderColor = "white";

    let markupItem = generateDoubleBoxElement(cardObject);
    let container = document.getElementById("card-list-container");
    while(container.firstChild) { container.removeChild(container.firstChild); }
    container.appendChild(markupItem);
}

function createGreenCard(cardNumber, noun, adjective) {
    let cardObject = getRedCardObject(cardNumber,noun,adjective);

    cardObject.borderColor = "green";

    let markupItem = generateDoubleBoxElement(cardObject);
    let container = document.getElementById("card-list-container");
    while(container.firstChild) { container.removeChild(container.firstChild); }
    container.appendChild(markupItem);
}

function createBlackCard(cardNumber, noun, adjective) {
    let cardObject = getRedCardObject(cardNumber,noun,adjective);

    cardObject.borderColor = "black";

    let markupItem = generateDoubleBoxElement(cardObject);
    let container = document.getElementById("card-list-container");
    while(container.firstChild) { container.removeChild(container.firstChild); }
    container.appendChild(markupItem);
}

function createYellowCard(cardNumber, noun, adjective) {
    let cardObject = getRedCardObject(cardNumber,noun,adjective);

    cardObject.borderColor = "yellow";

    let markupItem = generateDoubleBoxElement(cardObject);
    let container = document.getElementById("card-list-container");
    while(container.firstChild) { container.removeChild(container.firstChild); }
    container.appendChild(markupItem);
}

let bounds = {
    blue: { range: [1,43], create: createBlueCard, Description: "" },
    red: { range: [44,75], create: createRedCard, Description: ""  },
    black: { range: [76,120], create: createBlackCard, Description: ""  },
    green: { range: [121,153], create: createGreenCard, Description: ""  },
    yellow: { range: [154,190], create: createYellowCard, Description: ""  },
    white: { range: [191,210], create: createWhiteCard, Description: ""  },
}

function findBoundingRange(cardNumber) {
    for(let color in bounds) {
        let range = bounds[color].range;
        if (range[0] <= cardNumber && cardNumber <= range[1]) {
            return color;
        }
    }
}

function getCard(cardNumber, noun, adjective) {
    noun = noun || ytopia.words.GetNoun();
    adjective = adjective || ytopia.words.GetAdjective();
    cardNumber = cardNumber || ytopia.storage.getCurrentCardId();

    let creator = bounds[findBoundingRange(cardNumber)].create;
    creator(cardNumber, noun, adjective)
}
