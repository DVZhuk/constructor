;(function () {

const chooseElements = document.querySelectorAll('.choose-elem');
const addButtons = document.querySelectorAll('.add-btn');
const body = document.querySelector('body');

// функция управляющая меню элементов, недопускающая 
// одновременно открытых двух меню.
// Закрывает меню при повторном нажатии на текущую кнопку
const chooseElementsControlled = function (currentElement) {
    for (let i = 0; i < chooseElements.length; i ++) {
        if (chooseElements[i] !== chooseElements[currentElement]) {
            chooseElements[i].classList.add('choose-elem--hide'); 
        };
    };
    chooseElements[currentElement].classList.toggle('choose-elem--hide');
};

// функция обработчик закрывающая меню элемнтов
const onChooseElementRemove = function () {
    for (let i = 0; i < chooseElements.length; i ++) {
        chooseElements[i].classList.add('choose-elem--hide');  
    };
};

// Развес обработчиков на все кнопки открытия меню элементов
for (let i = 0; i < addButtons.length; i ++) {
    addButtons[i].addEventListener('click', function (evt) {
        evt.stopPropagation();
        chooseElementsControlled(i);
    });
};

// обработка событий закрытия меню элментов кликом вне меню
body.addEventListener('click', onChooseElementRemove);

})();






