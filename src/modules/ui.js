const createModal = () => {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'closeBtn';
    closeBtn.innerHTML = '&times;';

    const modalHeader = document.createElement('h2');
    modalHeader.textContent = 'Create New Project';

    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    projectNameInput.id = 'projectName';
    projectNameInput.placeholder = 'Project Name';
    projectNameInput.required = true;

    const projectColorInput = document.createElement('input');
    projectColorInput.type = 'color'; 
    projectColorInput.id = 'projectColor';
    projectColorInput.value = '#ff0000'; 

    const createProjectBtn = document.createElement('button');
    createProjectBtn.id = 'createProject';
    createProjectBtn.className = 'gral-btn';
    createProjectBtn.textContent = 'Add Project';

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(projectNameInput);
    modalContent.appendChild(projectColorInput); 
    modalContent.appendChild(createProjectBtn);
    modal.appendChild(modalContent);


    document.body.appendChild(modal);


    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        projectNameInput.value = ''; 
        projectColorInput.value = '#ff0000'; 
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            projectNameInput.value = ''; 
            projectColorInput.value = '#ff0000'; 
        }
    });

    return {
        modal,
        projectNameInput,
        projectColorInput, 
        createProjectBtn,
    };
};

const createTodoModal = () => {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'closeBtn';
    closeBtn.innerHTML = '&times;';

    const modalHeader = document.createElement('h2');
    modalHeader.textContent = 'Create New Todo';

    const todoTitleInput = document.createElement('input');
    todoTitleInput.type = 'text';
    todoTitleInput.id = 'todoTitle';
    todoTitleInput.placeholder = 'Todo Title';
    todoTitleInput.required = true;

    const todoDueDateInput = document.createElement('input');
    todoDueDateInput.type = 'date';
    todoDueDateInput.id = 'todoDueDate';
    todoDueDateInput.required = true;

    const todoPriorityInput = document.createElement('select');
    todoPriorityInput.id = 'todoPriority';
    const priorities = ['Low', 'Medium', 'High'];
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        todoPriorityInput.appendChild(option);
    });

    const createTodoBtn = document.createElement('button');
    createTodoBtn.id = 'createTodo';
    createTodoBtn.className = 'gral-btn';
    createTodoBtn.textContent = 'Add Todo';

    const saveTodoBtn = document.createElement('button'); 
    saveTodoBtn.id = 'saveTodo';
    saveTodoBtn.className = 'gral-btn';
    saveTodoBtn.textContent = 'Save Todo';
    saveTodoBtn.style.display = 'none'; 
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(todoTitleInput);
    modalContent.appendChild(todoDueDateInput);
    modalContent.appendChild(todoPriorityInput);
    modalContent.appendChild(createTodoBtn);
    modalContent.appendChild(saveTodoBtn); 
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        todoTitleInput.value = ''; 
        todoDueDateInput.value = ''; 
        todoPriorityInput.selectedIndex = 0; 
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            todoTitleInput.value = ''; 
            todoDueDateInput.value = ''; 
            todoPriorityInput.selectedIndex = 0;
        }
    });

    return {
        modal,
        modalHeader,
        todoTitleInput,
        todoDueDateInput,
        todoPriorityInput,
        createTodoBtn,
        saveTodoBtn 
    };
};

export { createModal, createTodoModal };