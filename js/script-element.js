;(function () {

const chooseElements = document.querySelectorAll('.choose-elem');
// Создание коллекции элементов содержащих в названии класса "elements-wrapper"
const elementsWrappers = document.querySelectorAll('[class*="elements-wrapper"]');
const body = document.querySelector('body');

// Массив добавочных элементов
const elementArray = [
       `<div class="element title" tabindex="0">
            <h1 contenteditable="true" data-placeholder="Заголовок H1">Заголовок H1</h1>
            <button type="button" class="delete-btn">
                <span class="visually-hidden">Удалить элемент</span>
            </button>
        </div>`,

       `<div class="element title" tabindex="0">
            <h2 contenteditable="true" data-placeholder="Заголовок H2">Заголовок H2</h2>
            <button type="button" class="delete-btn">
                <span class="visually-hidden">Удалить элемент</span>
            </button>
        </div>`,

       `<div class="element title" tabindex="0">
            <h3 contenteditable="true" data-placeholder="Заголовок H3">Заголовок H3</h3>
            <button type="button" class="delete-btn">
                <span class="visually-hidden">Удалить элемент</span>
            </button>
        </div>`,

       `<div class="element text " tabindex="0">
            <p contenteditable="true" data-placeholder="Абзац текста">Абзац текста</p>
            <button type="button" class="delete-btn">
                <span class="visually-hidden">Удалить элемент</span>
            </button>
        </div>`,

       `<div class="element element--image  image" tabindex="0">
            <button type="button" class="delete-btn">
                <span class="visually-hidden">Удалить элемент</span>
            </button>

            <button type="button" class="add-img-btn">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2V8H0V12H6V18H10V12H16V8H10V2H6ZM12 14V20H6V40C6 42.2 7.8 44 10 44H42C44.2 44 46 42.2 46 40V16C46 13.8 44.2 12 42 12H35.66L32 8H18V14H12ZM26 38C31.52 38 36 33.52 36 28C36 22.48 31.52 18 26 18C20.48 18 16 22.48 16 28C16 33.52 20.48 38 26 38ZM26 34C22.68 34 20 31.32 20 28C20 24.68 22.68 22 26 22C29.32 22 32 24.68 32 28C32 31.32 29.32 34 26 34Z"/>
                </svg>
            </button>
            
            <div class="img-upload">
                <p>Загрузите изображение</p>
                <input class="img-upload__url" type="url" placeholder="Вставьте ссылку на изображение">
                <label class="img-upload__label">Загрузить
                <input class="visually-hidden" type="file" accept="image/png, image/jpeg">
                </label>
            </div>

        </div>`
];

let image = document.createElement('img');

// Перебор всех областей в которых можно добавить элементы
for (let i = 0; i < chooseElements.length; i ++) {
    // Живой массив кнопок удаления элементов 
    // (их количество равно количеству добавленных элементов в области)
    let deleteElementButtons = elementsWrappers[i].getElementsByClassName('delete-btn');
    let addImageButtons = elementsWrappers[i].getElementsByClassName('add-img-btn');
    let uploadPopup = elementsWrappers[i].getElementsByClassName('img-upload');
    let uploadingButtons = elementsWrappers[i].getElementsByClassName('img-upload__label');
    let uploadingUrl = elementsWrappers[i].getElementsByClassName('img-upload__url');
    let imageElement = elementsWrappers[i].getElementsByClassName('image');
    // Перебор кнопок выбора конкретного элемента
    for (let j = 0; j < chooseElements[i].children.length; j ++) {
        // Добавление в выбранную области нажатого элемента
        // с помощью обработчика событий по клику
        chooseElements[i].children[j].addEventListener('click', function () {
            // добавление в конец обёртки нового элемента
            elementsWrappers[i].innerHTML += elementArray[j];

            // Развес обработки событий удаления элементов
            for (let k = 0; k < deleteElementButtons.length; k ++) {
                deleteElementButtons[k].addEventListener('click', function () {
                    this.parentElement.remove();
                    if (elementsWrappers[i].children.length == 0) {
                        if (i === 0) {
                            elementsWrappers[i].parentElement.classList.add('header--empty');
                        } else if (i === chooseElements.length - 1) {
                            elementsWrappers[i].parentElement.classList.add('footer--empty');
                        } else {
                            elementsWrappers[i].parentElement.classList.add('content--empty');
                        };
                    };
                });
            };

            // Проверка на наличие добавленного элемента в области
            // При наличии - удаление класса отвечающего за плейсхолдер ОБЛАСТИ
            if (elementsWrappers[i].children.length > 0) {
                if (i === 0) {
                    elementsWrappers[i].parentElement.classList.remove('header--empty');
                } else if (i === chooseElements.length - 1) {
                    elementsWrappers[i].parentElement.classList.remove('footer--empty');
                } else {
                    elementsWrappers[i].parentElement.classList.remove('content--empty');
                };
            };

            // Обработка клика по добавлению картинки
            if (addImageButtons.length > 0) {
                for (let k = 0; k < addImageButtons.length; k ++) {
                    addImageButtons[k].addEventListener('click', function (evt) {
                        evt.stopPropagation();
                        // Закрытие всех предыдущих попапов
                        for (let m = 0; m < addImageButtons.length; m ++) {
                            if (this !== addImageButtons[m]) {
                                addImageButtons[m].parentElement.classList.remove('element--uploading');
                            };
                        };

                        // Открытие закрытие попапа по клику на добавление картинки
                        this.parentElement.classList.toggle('element--uploading');
                        
                    });
                };
            };

            // Добавление картинки по ссылке
            if (j === 4) {
                for (let k = 0; k < uploadingButtons.length; k ++) {
                    uploadingButtons[k].addEventListener('click', function (evt) {
                        evt.preventDefault();
                        image.src = uploadingUrl[k].value;
                        imageElement[k].append(image);
                        image.parentElement.classList.toggle('element--uploading');
                        image.parentElement.classList.add('element--uploaded');
                    });
                };
            };

        });
    };
    
    // Закрытие попапа загрузки изображения при клике вне попапа
    body.addEventListener('click', function (evt) {
        for (let j = 0; j < uploadPopup.length; j ++) {
            if (chooseElements[i].parentElement.classList.contains('content') == false
                && evt.target !== uploadPopup[j]
                && evt.target !== uploadPopup[j].children[0]
                && evt.target !== uploadPopup[j].children[1]
                && evt.target !== uploadPopup[j].children[2]) {
                uploadPopup[j].parentElement.classList.remove('element--uploading');
            };
        };
    });

};
})();






