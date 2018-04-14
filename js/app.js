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

        currentCat: {},
        adminMode: false
    };

    let octapus = {
        init: function() {
            catListView.init();

            model.currentCat = model.cats[0];
            // let cats = octapus.getCats();
            // octapus.setCurrentCat(cats[0]);
            selectedCatView.init();

            adminView.init();
        },

        getCats: function() {
            return model.cats;
        },

        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        incrementCurrentCatClicks: function() {
            model.currentCat.clicks++;
            selectedCatView.render();
        },

        openAdminView: function() {
            model.adminMode = true;
            adminView.render();
        },

        closeAdminView: function() {
            model.adminMode = false;
            adminView.render();
        },

        updateCurrentCat: function() {
            model.currentCat.name = adminView.nameInput.value;
            model.currentCat.imgUrl = adminView.imgUrlInput.value;
            model.currentCat.clicks = adminView.clicksInput.value;

            selectedCatView.render();
            catListView.render();

            model.adminMode = false;
            adminView.render();
        },

        getAdminModeStatus: function() {
            return model.adminMode;
        }
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
                    adminView.render();
                });
            });
        },

        render: function() {
            let cats = octapus.getCats();
            document.querySelectorAll('.cat-list a').forEach(function(listItem, index) {
                listItem.innerText = cats[index].name;
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

            this.catImg.addEventListener('click', function() {
                // let clicksSpan = catContainer.querySelector('.clicks-span');
                // clicksSpan.innerText = ++selectedCat.clicks;

                octapus.incrementCurrentCatClicks();
                selectedCatView.render();
                //octapus.setCurrentCat(selectedCat);

                adminView.render();
            });

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

    let adminView = {
        init: function() {
            this.nameInput = document.querySelector('#name-input');
            this.imgUrlInput = document.querySelector('#img-url-input');
            this.clicksInput = document.querySelector('#clicks-input');

            this.adminForm = document.querySelector('.admin-form');
            this.adminForm.style.visibility = 'hidden';

            let adminButton = document.querySelector('.admin-button');
            let cancelButton = document.querySelector('.cancel-button');
            let saveButton = document.querySelector('.save-button');

            adminButton.addEventListener('click', function() {
                octapus.openAdminView();
            });

            cancelButton.addEventListener('click', function() {
                octapus.closeAdminView();
            });

            saveButton.addEventListener('click', function() {
                octapus.updateCurrentCat();
            });
        },

        render: function() {
            if (octapus.getAdminModeStatus() === false) {
                this.adminForm.style.visibility = 'hidden';
            } else {
                let selectedCat = octapus.getCurrentCat();
                this.nameInput.value = selectedCat.name;
                this.imgUrlInput.value = selectedCat.imgUrl;
                this.clicksInput.value = selectedCat.clicks;

                this.adminForm.style.visibility = 'visible';
            }
        }
    };

    octapus.init();

})();