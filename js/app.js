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
        this.hide();
    };

    let gameContainer = document.querySelector('.game-container');
    let catList = document.querySelector('.cat-list');

    Cat.prototype.addtoGame = function() {
        this.catContainer = document.createElement('div');
        this.catContainer.innerHTML = this.html;
        gameContainer.appendChild(this.catContainer);

        this.listItem = document.createElement('li');
        this.listItem.innerHTML = `
            <li>
                <a href="#">${this.name}</a>
            </li>
        `;
        catList.appendChild(this.listItem);

        this.listItem.addEventListener('click', function(e) {
                    currentCat.hide();
                    let selectedCatName = e.target.innerText;
                    currentCat = cats.find(cat => cat.name === selectedCatName);

                    currentCat.show();
            },
            false
        );

        this.catContainer.addEventListener('click',
            (function() {
                let clicks = 0;
                return function(e) {
                    let clicksSpan = currentCat.catContainer.querySelector('.clicks-span');

                    clicks++;
                    clicksSpan.innerText = clicks;
                };
            })(),
            false
        );
    };

    Cat.prototype.hide = function() {
        this.catContainer.style.display = "none";
    };

    Cat.prototype.show = function() {
        this.catContainer.style.display = "block";
    };

    let cats = [];

    cats.push(new Cat("Pixie", "img/cat1.jpg"));
    cats.push(new Cat("Venus", "img/cat2.jpg"));
    cats.push(new Cat("Banjo & Mars", "img/cat3.jpg"));
    cats.push(new Cat("Ruby", "img/cat4.jpg"));
    cats.push(new Cat("Taffy", "img/cat5.jpg"));

    let currentCat = cats[0];
    cats[0].show();
})();