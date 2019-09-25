(function(ytopia) {
    ytopia.random =(function() {
        this.random = new Random(new Random.engines.mt19937());
        this.ensureSeedSet = (array) => this.random.engine.seedWithArray(array);
        this.skip = (skipCount) => this.random.engine.discard(skipCount);
        this.integer = (lower,upper) => this.random.integer(lower,upper);
        return this;
    })();
})((window.ytopia = window.ytopia || {}))
