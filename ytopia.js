(function(ytopia) {
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

        document.getElementById("show_base_seed").textContent = ytopia.storage.getBaseSeed();
        document.getElementById("current_card_id").textContent = ytopia.storage.getCurrentCardId();
        document.getElementById("max_card_count").textContent = ytopia.storage.getTotalCardCount();
        RenderCard();
    }

    function RenderCard() {
        createDoubleBoxCard(ytopia.words.GetNoun(),ytopia.words.GetAdjective())
    }

    function SetupPage() {
        document.getElementById("page_seed").addEventListener("change",(evt) => {
            let pageseed = evt.target.value;
            ytopia.storage.setPageSeed(pageseed);
            ytopia.global.RenderPage();
        });
        document.getElementById("new_base_seed").addEventListener("click",(evt) => {
            let seed = ytopia.storage.resetBaseSeed();
            document.getElementById("show_base_seed").textContent = seed;
            ytopia.global.RenderPage();
        });
        document.getElementById("get_new_card").addEventListener("click",(evt) => {
            let cardId = ytopia.storage.getRandomCardId();
            document.getElementById("current_card_id").textContent = cardId;
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