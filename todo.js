let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDateTime = document.getElementById('taskDateTime');
    
    if (taskInput.value.trim() !== '') {
        tasks.push({ task: taskInput.value, dateTime: taskDateTime.value, completed: false });
        renderTasks();
        saveTasks();
        taskInput.value = '';
        taskDateTime.value = '';
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.draggable = true;
        li.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
        });
        li.innerHTML = `<input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
                        <span class="${task.completed ? 'completed' : ''}">${task.task} - ${task.dateTime}</span>
                        <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });
    
    updateTaskSummary();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
    saveTasks();
}

function updateTaskSummary() {
    const completedTasksElement = document.getElementById('completedTasks');
    const remainingTasksElement = document.getElementById('remainingTasks');
    
    const completedTasks = tasks.filter(task => task.completed).length;
    completedTasksElement.textContent = completedTasks;
    remainingTasksElement.textContent = tasks.length - completedTasks;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

loadTasks();