// Define UI varables
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    tasklist.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        // Create li element
        const li = document.createElement('li');

        // Add a class to the li element
        li.className = 'collection-item';

        // Create a text node for the li element and append it
        li.append(document.createTextNode(taskInput.value));

        //Create a new link element
        const link = document.createElement('a');

        // Add class to the link
        link.className = 'delete-item secondary-content';

        // Add an icon to the link
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the icon to the li list
        li.appendChild(link);

        // Append li to ul
        tasklist.appendChild(li);

        // Store in Local Storage
        storeTaskInLS(taskInput.value);

        // Clear Input
        taskInput.value = '';
    }

    e.preventDefault();
}

// Remove Task function 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove tasks from local storage
            removeTasksFromLS(e.target.parentElement.parentElement);
        }
    }

}

// Clear tasks function 
function clearTasks(e){
    // Clear task list 1
    // tasklist.innerHTML = '';

    // Clear task list 2 - Faster
    while(tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }

    // Clear tasks from local storage
    clearTaskFromLS();
}

// Filter tasks function
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(){
        
    });
}

// Store Task in Local Storage Function
function storeTaskInLS(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Display tasks from local storage in browser
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){

        // Create li element
        const li = document.createElement('li');

        // Add a class to the li element
        li.className = 'collection-item';

        // Create a text node for the li element and append it
        li.append(document.createTextNode(task));

        //Create a new link element
        const link = document.createElement('a');

        // Add class to the link
        link.className = 'delete-item secondary-content';

        // Add an icon to the link
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the icon to the li list
        li.appendChild(link);

        // Append li to ul
        tasklist.appendChild(li);

    });
}

// Delete a task from local storage
function removeTasksFromLS(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        // console.log(taskItem.textContent);
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks from local storage
function clearTaskFromLS(){
    localStorage.clear();
}