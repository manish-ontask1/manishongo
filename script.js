document.addEventListener('DOMContentLoaded', function() {
    const titleInput = document.getElementById('task-title-input');
    const descInput = document.getElementById('task-desc-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage on page load
    loadTasks();

    addButton.addEventListener('click', function() {
        const titleText = titleInput.value.trim();
        const descText = descInput.value.trim();

        if (titleText !== '') {
            const task = { title: titleText, description: descText };
            addTask(task);
            saveTasks();
            titleInput.value = '';
            descInput.value = '';
        }
    });

    taskList.addEventListener('click', function(event) {
        const listItem = event.target.parentNode;
        if (event.target.classList.contains('delete-button')) {
            taskList.removeChild(listItem);
            saveTasks();
        } else if (event.target.classList.contains('done-button')) {
            listItem.classList.toggle('task-done');
        }
    });

    function addTask(task) {
        const listItem = document.createElement('li');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.title;
        titleSpan.classList.add('task-title');
        const descSpan = document.createElement('span');
        descSpan.textContent = task.description;
        descSpan.classList.add('task-desc');
        const doneButton = createButton('Done', 'done-button');
        const editButton = createButton('Edit', 'edit-button');
        const deleteButton = createButton('Delete', 'delete-button');

        listItem.appendChild(titleSpan);
        listItem.appendChild(descSpan);
        listItem.appendChild(doneButton);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    function createButton(text, className) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add(className);
        return button;
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('#task-list li');
        taskItems.forEach(item => {
            const title = item.querySelector('.task-title').textContent;
            const description = item.querySelector('.task-desc').textContent;
            tasks.push({ title, description });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }
});