function GetCardDataArray(url){
    var request = new XMLHttpRequest(); // a new request
    request.open("GET",url,false);
    request.send(null);
    var json = JSON.parse(request.responseText);
    return json;
}

let blueCards = GetCardDataArray("cardData/blue.json");
let blackCards = GetCardDataArray("cardData/black.json");
let redCards = GetCardDataArray("cardData/red.json");
let greenCards = GetCardDataArray("cardData/green.json");
let yellowCards = GetCardDataArray("cardData/yellow.json");
let whiteCards = GetCardDataArray("cardData/white.json");

let allCards = [].concat(blueCards).concat(blackCards).concat(redCards).concat(greenCards).concat(yellowCards).concat(whiteCards);

ytopia.storage.setTotalCardCount(allCards.length);

for(let i=0; i < allCards.length; i++) {
    allCards[i].id = i;
    let noun = ytopia.words.GetNoun(i);
    let adjective = ytopia.words.GetAdjective(i);

    console.log(`${i} ${noun} ${adjective}`)

    // if the card doesn't have either an adjective OR a noun, supply it with the random ones.
    if (!allCards[i].noun || !allCards[i].adjective) {
        allCards[i].noun = noun;
        allCards[i].adjective = adjective;
    }
}

function renderDouble(card) {
    let owner = "owner";
    let ownerCount = card.down.ownerCount || 0;
    let health = "health";
    if (!!card.down && !card.down.ownerCount) {
        owner = "defend"
        ownerCount = card.down.defenseCount
        health = "life"
    }

    return `<div class="bounding ${card.borderColor} ${card.renderType}">
        <div class="colored-border"></div>
        <div class="icon-image icon-image-corner icon-image-tl"></div>
        <div class="icon-image icon-image-corner icon-image-tr"></div>
        <div class="icon-image icon-image-corner icon-image-ll"></div>
        <div class="icon-image icon-image-corner icon-image-lr"></div>
        <div class="lefttext innerbox">${card.adjective}</div>
        <div class="righttext innerbox">${card.noun}</div>

        ${card.up.cost ?  '<div class="card-cost card-cost-up">' : ""}
            ${(card.up.cost && card.up.cost.yellow && card.up.cost.yellow > 0) ? `${card.up.cost.yellow}<span class="icon-image yellow"></span>` : ``}
            ${(card.up.cost && card.up.cost.red && card.up.cost.red > 0) ? `${card.up.cost.red}<span class="icon-image red"></span>` : ``}
            ${(card.up.cost && card.up.cost.black && card.up.cost.black > 0) ? `${card.up.cost.black}<span class="icon-image black"></span>` : ``}
            ${(card.up.cost && card.up.cost.blue && card.up.cost.blue > 0) ? `${card.up.cost.blue}<span class="icon-image blue"></span>` : ``}
            ${(card.up.cost && card.up.cost.green && card.up.cost.green > 0) ? `${card.up.cost.green}<span class="icon-image green"></span>` : ``}
            ${(card.up.cost && card.up.cost.white && card.up.cost.white > 0) ? `${card.up.cost.white}<span class="icon-image white"></span>` : ``}
        ${(card.up.cost) ? `</div>">` : ``}
        <div class="half-up innerbox">
            <div class="half-template">
                <img src="images/${card.up.image}.png" class="main-half" />
                <div class="stats-template">
                    <p class="card-name">${card.up.name}</p>
                    <p><img src="images/draw${!!card.up.drawCount ? card.up.drawCount : ''}.png" class="icon-image draw-stat"><img src="images/move${!!card.up.moveCount ? card.up.moveCount : ''}.png" class="icon-image  move-stat"></p>
                    <p><img src="images/health${!!card.up.healthCount ? card.up.healthCount : ''}.png" class="icon-image health-stat"><img src="images/owner${!!card.up.ownerCount ? card.up.ownerCount : ''}.png" class="icon-image owner-stat"></p>
                </div>
            </div>
        </div>

        ${card.up.cost ?  '<div class="card-cost card-cost-down">' : ""}
            ${(card.down.cost && card.down.cost.yellow && card.down.cost.yellow > 0) ? `${card.down.cost.yellow}<span class="icon-image yellow"></span>` : ``}
            ${(card.down.cost && card.down.cost.red && card.down.cost.red > 0) ? `${card.down.cost.red}<span class="icon-image red"></span>` : ``}
            ${(card.down.cost && card.down.cost.black && card.down.cost.black > 0) ? `${card.down.cost.black}<span class="icon-image black"></span>` : ``}
            ${(card.down.cost && card.down.cost.blue && card.down.cost.blue > 0) ? `${card.down.cost.blue}<span class="icon-image blue"></span>` : ``}
            ${(card.down.cost && card.down.cost.green && card.down.cost.green > 0) ? `${card.down.cost.green}<span class="icon-image green"></span>` : ``}
            ${(card.down.cost && card.down.cost.white && card.down.cost.white > 0) ? `${card.down.cost.white}<span class="icon-image white"></span>` : ``}
        ${(card.down.cost) ? `</div>">` : ``}
        <div class="half-down innerbox">
            <div class="half-template">
                <img src="images/${card.down.image}.png" class="main-half" />
                <div class="stats-template">
                    <p class="card-name">${card.down.name}</p>
                    <p><img src="images/draw${!!card.down.drawCount ? card.down.drawCount : ''}.png" class="icon-image draw-stat"><img src="images/move${!!card.down.moveCount ? card.up.moveCount : ''}.png" class="icon-image  move-stat"></p>
                    <p><img src="images/${health}${!!card.down.healthCount ? card.down.healthCount : ''}.png" class="icon-image ${health}-stat"><img src="images/${owner}${!!ownerCount ? ownerCount : ''}.png" class="icon-image ${owner}-stat"></p>
                </div>
            </div>
        </div>
    </div>`;
}

function renderSingle(card) {
    let owner = "owner";
    let ownerCount = card.up.ownerCount || 0;
    if (!!card.up && !card.up.ownerCount) {
        owner = "defend"
        ownerCount = card.up.defenseCount
    }

    return `<div class="bounding ${card.borderColor} single">
        <div class="colored-border"></div>
        <div class="icon-image icon-image-corner icon-image-tl"></div>
        <div class="icon-image icon-image-corner icon-image-tr"></div>
        <div class="icon-image icon-image-corner icon-image-ll"></div>
        <div class="icon-image icon-image-corner icon-image-lr"></div>
        <div class="lefttext innerbox">${card.adjective}</div>
        <div class="righttext innerbox">${card.noun}</div>

        ${card.up.cost ?  '<div class="card-cost card-cost-up">' : ""}
            ${(card.up.cost && card.up.cost.yellow && card.up.cost.yellow > 0) ? `${card.up.cost.yellow}<span class="icon-image yellow"></span>` : ``}
            ${(card.up.cost && card.up.cost.red && card.up.cost.red > 0) ? `${card.up.cost.red}<span class="icon-image red"></span>` : ``}
            ${(card.up.cost && card.up.cost.black && card.up.cost.black > 0) ? `${card.up.cost.black}<span class="icon-image black"></span>` : ``}
            ${(card.up.cost && card.up.cost.blue && card.up.cost.blue > 0) ? `${card.up.cost.blue}<span class="icon-image blue"></span>` : ``}
            ${(card.up.cost && card.up.cost.green && card.up.cost.green > 0) ? `${card.up.cost.green}<span class="icon-image green"></span>` : ``}
            ${(card.up.cost && card.up.cost.white && card.up.cost.white > 0) ? `${card.up.cost.white}<span class="icon-image white"></span>` : ``}
        ${(card.up.cost) ? `</div>">` : ``}
        <div class="half-up innerbox">
            <div class="half-template">
                <h2 class="card-name">${card.up.name}</h2>
                <img src="images/${card.up.image}.png" class="main-half" />
                <div class="stats-template">
                    <img src="images/draw${!!card.up.drawCount ? card.up.drawCount : ''}.png" class="icon-image draw-stat">
                    <img src="images/move${!!card.up.moveCount ? card.up.moveCount : ''}.png" class="icon-image  move-stat">
                    <img src="images/health${!!card.up.healthCount ? card.up.healthCount : ''}.png" class="icon-image health-stat">
                    <img src="images/${owner}${!!ownerCount ? ownerCount : ''}.png" class="icon-image ${owner}-stat">
                </div>
            </div>
        </div>
    </div>`;

}

function renderGhost(card) {
    return `<div class="bounding ${card.borderColor} ${card.renderType} ghost blank-card">
        <div class="colored-border"></div>
        <div class="icon-image icon-image-corner icon-image-tl"></div>
        <div class="icon-image icon-image-corner icon-image-tr"></div>
        <div class="icon-image icon-image-corner icon-image-ll"></div>
        <div class="icon-image icon-image-corner icon-image-lr"></div>
        <div class="lefttext innerbox">${card.adjective}</div>
        <div class="righttext innerbox">${card.noun}</div>
        <div class="blank-image"></div>
    </div>`;

}

function renderSkip(card) {
    return `<div class="bounding ${card.borderColor} ${card.renderType} blank-card">
        <div class="colored-border"></div>
        <div class="icon-image icon-image-corner icon-image-tl"></div>
        <div class="icon-image icon-image-corner icon-image-tr"></div>
        <div class="icon-image icon-image-corner icon-image-ll"></div>
        <div class="icon-image icon-image-corner icon-image-lr"></div>
        <div class="lefttext innerbox">${card.adjective}</div>
        <div class="righttext innerbox">${card.noun}</div>
        <div class="blank-image"></div>
    </div>`;

}

function renderWild(card) {
    return `<div class="bounding ${card.borderColor} ${card.renderType}">
        <div class="colored-border"></div>
        <div class="icon-image icon-image-corner icon-image-tl"></div>
        <div class="icon-image icon-image-corner icon-image-tr"></div>
        <div class="icon-image icon-image-corner icon-image-ll"></div>
        <div class="icon-image icon-image-corner icon-image-lr"></div>
        <div class="lefttext innerbox">${card.adjective}</div>
        <div class="righttext innerbox">${card.noun}</div>
    </div>`;

}

function renderAction(card) {
    return `<div class="bounding ${card.borderColor} ${card.renderType}">
        <div class="colored-border"></div>
        <div class="icon-image icon-image-corner icon-image-tl"></div>
        <div class="icon-image icon-image-corner icon-image-tr"></div>
        <div class="icon-image icon-image-corner icon-image-ll"></div>
        <div class="icon-image icon-image-corner icon-image-lr"></div>
        <div class="lefttext innerbox">${card.adjective}</div>
        <div class="righttext innerbox">${card.noun}</div>
        <div class="actionBox">
            <div class="staticHeight">
                <img src="/images/${card.action.type}${!!card.action.value ? card.action.value : ""}.png" />
            </div>
            <span>
                <h2>${card.action.title}</h2>
                <p>${card.action.text}</p>
            </span>
        </div>
    </div>`;

}

function renderBlank(card) {
    return `<div class="bounding ${card.borderColor} ${card.renderType} blank-card">
        <div class="colored-border"></div>
        <div class="icon-image icon-image-corner icon-image-tl"></div>
        <div class="icon-image icon-image-corner icon-image-tr"></div>
        <div class="icon-image icon-image-corner icon-image-ll"></div>
        <div class="icon-image icon-image-corner icon-image-lr"></div>
        <div class="lefttext innerbox">${card.adjective}</div>
        <div class="righttext innerbox">${card.noun}</div>
        <div class="blank-image"></div>
    </div>`;
}

function getCard(cardNumber, noun, adjective) {
    let container = document.getElementById("card-list-container");
    while(container.firstChild) { container.removeChild(container.firstChild); }

    noun = noun || ytopia.words.GetNoun(cardNumber);
    adjective = adjective || ytopia.words.GetAdjective(cardNumber);
    cardNumber = cardNumber || ytopia.storage.getCurrentCardId(cardNumber);

    if (cardNumber > allCards.length) {
        cardNumber = allCards.length;
    }

    let cardObject = allCards[cardNumber]
    // if the card doesn't have either an adjective OR a noun, supply it with the random ones.
    if (!cardObject.noun && !cardObject.adjective) {
        cardObject.noun = noun;
        cardObject.adjective = adjective;
    }

    let markupItem = {};

    switch(cardObject.renderType) {
        case 'ghost':
            markupItem = renderGhost(cardObject);
            break;
        case 'wild':
            //markupItem = renderWild(cardObject);
            markupItem = renderBlank(cardObject);
            break;
        case 'action':
            markupItem = renderAction(cardObject);
            break;
        case 'single':
            markupItem = renderSingle(cardObject);
            break;
        case 'double':
            markupItem = renderDouble(cardObject);
            break;
        case 'blank':
            markupItem = renderBlank(cardObject);
            break;
        case 'skip':
            markupItem = renderSkip(cardObject);
            break;
        default:
            console.log(`ERROR: can't find the render case for ${cardObject.renderType}`);
            throw '';
    }

    let cuttingWrapper = document.createElement("div");
    cuttingWrapper.classList.add("outside-cutting-wrapper");
    cuttingWrapper.innerHTML = markupItem;

    container.appendChild(cuttingWrapper);
}


function getAllCards(color) {
    let container = document.getElementById("card-list-container");
    while(container.firstChild) { container.removeChild(container.firstChild); }

    let cardArray = [];


    for (i = 0; i < allCards.length; i++) {
        cardArray[i] = allCards[i];
    }

    if(!!color && ['blue','black','white','red','green','yellow'].includes(color)) {
        cardArray = [];
        for (i = 0; i < allCards.length; i++) {
            let card = allCards[i];
            if (card.borderColor == color) {
                cardArray.push(card);
            }
        }
    }

    for (let cardObject of cardArray) {
        let markupItem = {};

        switch(cardObject.renderType) {
            case 'ghost':
                markupItem = renderGhost(cardObject);
                break;
            case 'wild':
                //markupItem = renderWild(cardObject);
                markupItem = renderBlank(cardObject);
                break;
            case 'action':
                markupItem = renderAction(cardObject);
                break;
            case 'single':
                markupItem = renderSingle(cardObject);
                break;
            case 'double':
                markupItem = renderDouble(cardObject);
                break;
            case 'blank':
                markupItem = renderBlank(cardObject);
                break;
            case 'skip':
                markupItem = renderSkip(cardObject);
                break;
            default:
                console.log(`ERROR: can't find the render case for ${cardObject.renderType}`);
                throw '';
        }


        let cuttingWrapper = document.createElement("div");
        cuttingWrapper.classList.add("outside-cutting-wrapper");
        cuttingWrapper.innerHTML = markupItem;
        container.appendChild(cuttingWrapper);
    }
}

