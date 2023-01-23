const todoForm = document.getElementById('todoForm'); // HTML Form
const addItem = document.getElementById('addItem'); // HTML Input
const addBtn = document.getElementById('addBtn'); // HTML Button
const todoList = document.getElementById('todoList'); // HTML Ordered List

// If no todoStorage exists...
if (!localStorage.todoStorage) {
    // Create a Key Value pair in Local Storage containing an empty array {todoStorage: []}
    localStorage.setItem('todoStorage', "[]");
}

// Get our existing todos, either what's already in Local Storage, or the empty array..
const todos = JSON.parse(localStorage.todoStorage);

// Button that clears our Todo List
const clearAll = document.getElementById('clearAll');

// Iterating through our todos array []
for (let todo of todos) {
    // A new Todo List Item
    const newTodo = document.createElement('li');
    
    // Span within this list Item - this is where we add the text for our todo item
    const newTodoSpan = document.createElement('span');
    
    // Change the text on the page to the current todo iteration
    newTodoSpan.innerText = todo
    newTodo.append(newTodoSpan)
    
    // Add the todo LI to the OL
    todoList.append(newTodo)
    
    // Add a button to mark done next to that TODO item
    const doneBtn = document.createElement('button');
    doneBtn.innerText = 'Mark Done';
    
    // Add a button to remove that TODO item
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    
    // Add both the Done and Remove Buttons to that Todo Item
    newTodo.append(doneBtn);
    newTodo.append(removeBtn);
}

// If we click the submmit button...
todoForm.addEventListener('submit', function (e) {
    // Prevent the form from leaving the page with a POST request
    e.preventDefault()
    
    // If the form input isn't empty...
    if (addItem.value) {
  
        // Create a new LI
        const newItem = document.createElement('li');
        
        // Create a new Span
        const newItemSpan = document.createElement('span');
        
        // Insert the value from the Input into the New Span
        newItemSpan.innerText = addItem.value;
        
        // Put the Span into the LI
        newItem.append(newItemSpan);
        
        // Insert the LI into the OL
        todoList.appendChild(newItem);
        
        // Insert the string value from the form input into our Array in Script
        todos.push(addItem.value);
        
        // Update Local Storage in Browser based on Array in Script
        localStorage.setItem('todoStorage', JSON.stringify(todos));
        
        // Reset value in Input to Empty String after Appending to List
        addItem.value = '';
        
        // Add a Done and Remove Button to TODO Item
        const doneBtn = document.createElement('button');
        doneBtn.innerText = 'Mark Done';
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove'
        newItem.append(doneBtn);
        newItem.append(removeBtn);
    }
})


todoList.addEventListener('click', function (e) {
    // If we are clicking Remove Button
    if (e.target.tagName === 'BUTTON' && e.target.innerText === 'Remove') {
        const textRemove = e.target.parentElement.firstChild.innerText
        todos.splice(todos.indexOf(textRemove));
        localStorage.setItem('todoStorage', JSON.stringify(todos));
        e.target.parentElement.remove();
    }
    // If we are clicking MARK DONE button
    if (e.target.tagName === 'BUTTON' && e.target.innerText === 'Mark Done') {
        // Add done class (cross out and red in CSS) to Item
        e.target.parentElement.classList.toggle('done');
    }
})

// Clear all items in script array and local storage
clearAll.addEventListener('click', function () {
    localStorage.clear();
    todos.splice(0, todos.length);
    todoList.innerHTML = '';
})
