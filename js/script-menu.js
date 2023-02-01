;(function () {

const chooseElements = document.querySelectorAll('.choose-elem');
const gridSelectButtons = document.querySelectorAll('.grid-select__btn');
const layout = document.querySelector('.layout');
const elementsWrappers = document.querySelectorAll('[class*="elements-wrapper"]');

const keyGrid = [
    'layout--landing',
    'layout--blog',
    'layout--shop'
];

const gridClassInstaller = function (currentButton) {
    for (let key in keyGrid) {
        layout.classList.remove(keyGrid[key]);
    };
    layout.classList.add(keyGrid[currentButton]);
};

for (let i = 0; i < gridSelectButtons.length; i ++) {
    gridSelectButtons[i].addEventListener('click', function () {
        gridClassInstaller(i);

        // Очистка контента при смене сетки
        for (let j = 0; j < elementsWrappers.length; j ++) {
            elementsWrappers[j].innerHTML = '';
            if (elementsWrappers[j].children.length <= 0) {
                if (j === 0) {
                    elementsWrappers[j].parentElement.classList.add('header--empty');
                } else if (j === chooseElements.length - 1) {
                    elementsWrappers[j].parentElement.classList.add('footer--empty');
                } else {
                    elementsWrappers[j].parentElement.classList.add('content--empty');
                };
            };
        };

    });
};

})();

