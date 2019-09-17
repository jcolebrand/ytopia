(function(ytopia) {
    ytopia.random = (ytopia.random || {});
    ytopia.random.seed = ytopia.random.seed || Date.now();
    ytopia.random.engine = ytopia.random.engine || new Random.engines.mt19937();
    ytopia.random.integer = ytopia.random.integer || Random.integer;
})((window.ytopia = window.ytopia || {}))