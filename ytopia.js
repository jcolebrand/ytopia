(function(ytopia) {
    let setupHasAlreadyRun = false;

    function RenderPage() {
        let currentPageSeed = ytopia.storage.getPageSeed()
        let page_seed = document.getElementById("page_seed");
        var page_seed_options = page_seed.options;
        for (var opt, j = 0; opt = page_seed_options[j]; j++) {
            if (opt.value == currentPageSeed) {
                page_seed.selectedIndex = j;
                break;
            }
        }

        document.getElementById("set_base_seed_input").value = ytopia.storage.getBaseSeed();
        document.getElementById("max_card_count").textContent = ytopia.storage.getTotalCardCount();
        document.getElementById("goto_card_input").setAttribute("max", ytopia.storage.getTotalCardCount());
        document.getElementById("goto_card_input").value = ytopia.storage.getCurrentCardId();
        RenderCard();
    }

    function RenderCard() {
        getCard()
    }

    function SetupPage() {
        if (setupHasAlreadyRun) {
            console.log("ytopia page setup tried to run twice");
        } else {
            setupHasAlreadyRun = true;
        }
        document.getElementById("page_seed").addEventListener("change",(evt) => {
            let pageseed = evt.target.value;
            ytopia.storage.setPageSeed(pageseed);
            ytopia.global.RenderPage();
        });
        document.getElementById("new_base_seed").addEventListener("click",(evt) => {
            let seed = ytopia.storage.getRandomBaseSeed();
            document.getElementById("set_base_seed_input").value = seed;
            ytopia.global.RenderPage();
        });
        document.getElementById("get_new_card").addEventListener("click",(evt) => {
            let cardId = ytopia.storage.getRandomCardId();
            document.getElementById("goto_card_input").value = cardId;
            ytopia.global.RenderPage();
        });
        document.getElementById("set_base_seed").addEventListener("click",(evt)=> {
            let newSeed = document.getElementById("set_base_seed_input").value;
            ytopia.storage.setBaseSeed(newSeed);
            ytopia.global.RenderPage();
        });
        document.getElementById("goto_card").addEventListener("click",(evt)=> {
            let newSeed = document.getElementById("goto_card_input").value;
            ytopia.storage.setCurrentCardId(newSeed);
            ytopia.global.RenderPage();
        });
        document.getElementById("goto_card_input").addEventListener("change", (evt) => {
            let newCardId = evt.srcElement.value;
            ytopia.storage.setCurrentCardId(newCardId);
            ytopia.global.RenderPage();
        });
        document.getElementById("set_base_seed_input").addEventListener("change", (evt) => {
            let newSeed = evt.srcElement.value;
            ytopia.storage.setBaseSeed(newSeed);
            ytopia.global.RenderPage();
        });
    }

    ytopia.global = ytopia.global || {
        RenderPage,
        SetupPage,
        RenderCard
    };

    window.addEventListener('DOMContentLoaded',ytopia.global.RenderPage);
    window.addEventListener('DOMContentLoaded',ytopia.global.SetupPage);
})((window.ytopia = window.ytopia || {}))