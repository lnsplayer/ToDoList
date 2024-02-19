// Создание переменных для упрощения написания кода и массива для добавления новых пунктов

let addMessage = document.querySelector('.message'),
    addButton= document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    todoList = [];

// Проверка на наличие todo в localStorage и последующее сохранение страницы

if(localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

// Создание новых todo-пунктов при наличии в инпуте текста и нажатии кнопки

addButton.addEventListener("click", function() {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList)); // Добавление в localStorage
    addMessage.value = '';
});

// Написание функции для добавления todo-пунктов в список

function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i) {
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
        </li>
        `;

        todo.innerHTML = displayMessage;
    });
}

// Написание фунции для реализации сохранения checked

todo.addEventListener('change', function(event) {
    let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') +']').innerHTML;
    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });

});

// Написание фунции для удаления todo-пунктов

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    todoList.forEach(function(item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});