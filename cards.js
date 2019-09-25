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
    "Tech Factory"  //12
]

let borderColors = [
    "blue",
    "green",
    "black",
    "red",
    "yellow",
    "white"
]

function getCardObject(cardNumber,noun,adjective) {
    ytopia.random.ensureSeedSet(ytopia.storage.getSeedArray("cards"));

    let upImage = ytopia.random.integer(1,12);
    let downImage = ytopia.random.integer(1,12);
    let bits = [...Array(8)].map((x,i)=>cardNumber>>i&3)
    let cardObject = {
        borderColor: borderColors[cardNumber % 6],
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
            image: "b" + upImage,
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
            image: "b" + downImage,
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

function createDoubleBoxCard(noun,adjective) {
    let cardObject = getCardObject(ytopia.storage.getCurrentCardId(),noun,adjective);

    let markupItem = generateDoubleBoxElement(cardObject);
    let container = document.getElementById("card-list-container");
    while(container.firstChild) { container.removeChild(container.firstChild); }
    container.appendChild(markupItem);
}
