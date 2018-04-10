(function() {

    let Cat = function(name, imgUrl) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.html = `
            <div class="cat-container">
                <div class="cat-name">
                    ${this.name}
                </div>

                <img class="cat-img" src=${this.imgUrl}>
                <div class="clics-container">
                    Number of clicks: <span class="clicks-span">0</span>
                </div>
            </div>
        `;
        this.addtoGame();
    };

    let gameContainer = document.querySelector('.game-container');

    Cat.prototype.addtoGame = function() {
        let catContainer = document.createElement('div');
        catContainer.innerHTML = this.html;
        gameContainer.appendChild(catContainer);

        catContainer.addEventListener('click',
            (function() {
                let clicks = 0;
                return function(e) {
                    if (e.target.classList.contains('cat-img')) {
                        let clicksSpan = e.target.parentElement.querySelector('.clicks-span');
                        clicks++;
                        clicksSpan.innerText = clicks;
                    }
                };
            })(),
            false
        );
    };

    let cats = [];

    cats.push(new Cat("Cat1", "img/cat1.jpg"));
    cats.push(new Cat("Cat2", "img/cat2.jpg"));

})();