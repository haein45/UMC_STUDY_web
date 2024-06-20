function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    
    if (task === '') return;

    const todoList = document.getElementById('todoList');

    const listItem = document.createElement('li');
    listItem.innerHTML = `${task} <button onclick="completeTask(this)">완료</button>`;
    todoList.appendChild(listItem);

    taskInput.value = '';
}

function completeTask(button) {
    const listItem = button.parentElement;
    listItem.querySelector('button').remove();
    
    const doneList = document.getElementById('doneList');
    listItem.innerHTML += ` <button onclick="deleteTask(this)">삭제</button>`;
    listItem.classList.add('done');
    doneList.appendChild(listItem);
}

function deleteTask(button) {
    const listItem = button.parentElement;
    listItem.remove();
}
