(function() {
    let cat = document.querySelector('.cat');
    let counter = document.querySelector('.counter');
    cat.addEventListener('click',
        (function() {
            let clicks = 0;
            return function(e) {
                clicks++;
                counter.innerText = clicks;
            };
        })(),
        false
    );
})();