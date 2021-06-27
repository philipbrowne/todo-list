const todoForm = document.getElementById('todoForm');
const addItem = document.getElementById('addItem');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
if (!localStorage.todoStorage) {
    localStorage.setItem('todoStorage', "[]");
}
const todos = JSON.parse(localStorage.todoStorage);
const clearAll = document.getElementById('clearAll');


for (let todo of todos) {
    const newTodo = document.createElement('li');
    const newTodoSpan = document.createElement('span');
    newTodoSpan.innerText = todo
    newTodo.append(newTodoSpan)
    todoList.append(newTodo)
    const doneBtn = document.createElement('button');
    doneBtn.innerText = 'Mark Done';
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    newTodo.append(doneBtn);
    newTodo.append(removeBtn);
}

todoForm.addEventListener('submit', function (e) {
    e.preventDefault()
    if (addItem.value) {
        const newItem = document.createElement('li');
        const newItemSpan = document.createElement('span');
        newItemSpan.innerText = addItem.value;
        newItem.append(newItemSpan);
        todoList.appendChild(newItem);
        todos.push(addItem.value);
        localStorage.setItem('todoStorage', JSON.stringify(todos));
        addItem.value = '';
        const doneBtn = document.createElement('button');
        doneBtn.innerText = 'Mark Done';
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        newItem.append(doneBtn);
        newItem.append(removeBtn);
    }
})


todoList.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.innerText === 'Remove') {
        const textRemove = e.target.parentElement.firstChild.innerText
        todos.splice(todos.indexOf(textRemove));
        localStorage.setItem('todoStorage', JSON.stringify(todos));
        e.target.parentElement.remove();
    }
    if (e.target.tagName === 'BUTTON' && e.target.innerText === 'Mark Done') {
        e.target.parentElement.classList.toggle('done');
    }
})

clearAll.addEventListener('click', function () {
    localStorage.clear();
    todos.splice(0, todos.length);
    todoList.innerHTML = '';
})