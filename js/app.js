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
        }],

        currentCat: {}
    };

    let octapus = {
        init: function() {
            catListView.init();

            model.currentCat = model.cats[0]; /*added*/
            // let cats = octapus.getCats();
            // octapus.setCurrentCat(cats[0]);
            selectedCatView.init();
        },

        getCats: function() {
            return model.cats;
        },

        setCurrentCat: function(selectedCat) {
            model.currentCat = selectedCat;
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        incrementCurrentCatClicks: function() {  /*added*/
            model.currentCat.clicks++;  /*added*/
            selectedCatView.render();  /*added*/
        }  /*added*/

    };

    let catListView = {

/*
        init: function() {
            let catList = document.querySelector('.cat-list');

            let cats = octapus.getCats();
            for (let i=0; i<cats.length; i++) {

                let listItem = document.createElement('li');
                listItem.innerHTML = `
                    <li>
                        <a href="#">${cats[i].name}</a>
                    </li>
                `;
                catList.appendChild(listItem);

                let cat = cats[i];  // With 'let' cat variable's scope is the for block
                                    // That's why each EventListener see its own value of cat
                listItem.addEventListener('click', function(e) {
                        octapus.setCurrentCat(cat);

                        selectedCatView.render();
                    }
                );
            }
        }
*/

/*
        init: function() {
            let catList = document.querySelector('.cat-list');

            let cats = octapus.getCats();
            for (let i=0; i<cats.length; i++) {

                let listItem = document.createElement('li');
                listItem.innerHTML = `
                    <li>
                        <a href="#">${cats[i].name}</a>
                    </li>
                `;
                catList.appendChild(listItem);

                var cat = cats[i];  // With 'var' cat variable's scope is the init function
                                    // That's why all EventListeners see the last value of cat: cats[4]
                                    // To Solve this problem we pass tha cat value to each listener
                                    // and create an inner closure to keep that value
                listItem.addEventListener('click', (function(cat) {
                    return function(e) {
                            octapus.setCurrentCat(cat);
                            selectedCatView.render();
                        };
                    }
                )(cat));
            }
        }
*/

        init: function() {
            let catList = document.querySelector('.cat-list');

            // forEach creates a closure for each EventListener
            // That's why each EventListener see its own value of cat
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
                        selectedCatView.render();
                    }
                );
            });
        }
    };

    let selectedCatView = {
        init: function() {
            let catContainer = document.querySelector('.cat-container');

            catContainer.innerHTML = `
                <div class="cat-name">
                </div>

                <img class="cat-img" src="" alt="A cat">

                <div class="clics-container">
                    Number of clicks: <span class="clicks-span"></span>
                </div>
            `;

            this.catName = document.querySelector('.cat-name');
            this.catImg = document.querySelector('.cat-img');
            this.catClicks = document.querySelector('.clicks-span');

            this.catImg.addEventListener('click',
                function() {
                    // let clicksSpan = catContainer.querySelector('.clicks-span');
                    // clicksSpan.innerText = ++selectedCat.clicks;

                    octapus.incrementCurrentCatClicks(); /*added*/
                    selectedCatView.render(); /*added*/
                    //octapus.setCurrentCat(selectedCat);
                }
            );

            selectedCatView.render();
        },

        render: function() {
            let selectedCat = octapus.getCurrentCat();

            this.catName.innerText = selectedCat.name; // innerText returns the visible text contained in a node,
                                                       // while textContent returns the full text
            this.catImg.setAttribute('src', selectedCat.imgUrl);
            // OR: this.catImg.src = selectedCat.imgUrl;
            this.catClicks.innerText = selectedCat.clicks;
        }
    };

    octapus.init();

})();