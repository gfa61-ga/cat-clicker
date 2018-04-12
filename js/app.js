(function() {

    let model = {
        cats: [{
                name: 'Pixie',
                imgUrl: 'img/cat1.jpg',
                clicks: 0
            }, {
                name: 'Venus',
                imgUrl: 'img/cat2.jpg',
                clicks: 0
            }, {
                name: 'Banjo & Mars',
                imgUrl: 'img/cat3.jpg',
                clicks: 0
            }, {
                name: 'Ruby',
                imgUrl: 'img/cat4.jpg',
                clicks: 0
            }, {
                name: 'Taffy',
                imgUrl: 'img/cat5.jpg',
                clicks: 0
            }
        ],

        currentCat: {}
    };

    let octapus = {
        init: function() {
            viewCatList.init();

            let cats = octapus.getCats();
            octapus.setCurrentCat(cats[0]);
            viewSelectedCat.init();
        },

        getCats: function() {
            return model.cats;
        },

        setCurrentCat: function(selectedCat) {
            model.currentCat = selectedCat;
        },

        getCurrentCat: function() {
            return model.currentCat;
        }
    };

    let viewCatList = {
        init: function() {
            let catList = document.querySelector('.cat-list');

            octapus.getCats().forEach(function(cat) {
                let listItem = document.createElement('li');
                listItem.innerHTML = `
                    <li>
                        <a href="#">${cat.name}</a>
                    </li>
                `;
                catList.appendChild(listItem);

                listItem.addEventListener('click', function(e) {
                        octapus.setCurrentCat(cat);

                        viewSelectedCat.render();
                    },
                    false
                );
            });
        }
    };

    let viewSelectedCat = {
        init: function() {
            viewSelectedCat.render();
        },

        render: function() {
            let gameContainer = document.querySelector('.game-container');
            let selectedCat = octapus.getCurrentCat();

            gameContainer.innerHTML = `
                <div class="cat-container">
                    <div class="cat-name">
                        ${selectedCat.name}
                    </div>

                    <img class="cat-img" src=${selectedCat.imgUrl}>
                    <div class="clics-container">
                        Number of clicks: <span class="clicks-span">${selectedCat.clicks}</span>
                    </div>
                </div>
            `;

            let catContainer = document.querySelector('.cat-container');

            catContainer.addEventListener('click',
                function() {
                    let clicksSpan = catContainer.querySelector('.clicks-span');
                    clicksSpan.innerText = ++selectedCat.clicks;

                    octapus.setCurrentCat(selectedCat);
                },
                false
            );
        }
    };

    octapus.init();

})();
