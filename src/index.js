import { createTodo, editTodo, deleteTodo, getPriorityClass, markTodoAsComplete, isOverdue } from './modules/todo';
import { saveToLocalStorage, loadFromLocalStorage } from './modules/storage';
import '../src/style.css';
import projectUtils from './modules/project';
import { createModal, createTodoModal } from './modules/ui'; 

const { createProject } = projectUtils;

const projectsList = document.getElementById('projects-list');
const todosList = document.getElementById('todos-list');
const newProjectBtn = document.getElementById('new-project-btn');
const newTodoBtn = document.getElementById('new-todo-btn');

let projects = [];
let currentProjectIndex = 0;

const { modal, projectNameInput, createProjectBtn, projectColorInput } = createModal();
const { modal: todoModal, modalHeader, todoTitleInput, todoDueDateInput, todoPriorityInput, createTodoBtn, saveTodoBtn } = createTodoModal();

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) && !isNaN(new Date(dateString).getTime());
}

function initializeProjects() {
    const storedProjects = loadFromLocalStorage();
    if (storedProjects) {
        projects = storedProjects;
    } else {
        const defaultProject = createProject('Default Project', '#04AA6D');
        projects.push(defaultProject);
    }
}

function deleteProject(projectIndex) {
  const deletedProject = projects[projectIndex];

  projects.splice(projectIndex, 1); 
  if (projects.length > 0) {

      if (currentProjectIndex >= projectIndex) {
    
          currentProjectIndex = Math.max(currentProjectIndex - 1, 0);
      }
      renderTodos(currentProjectIndex); 
  } else {
 
      currentProjectIndex = 0;
      todosList.innerHTML = ''; 
  }
  
  renderProjects(); 
  saveToLocalStorage(projects); 
}

function confirmDeleteProject(projectIndex) {
  const confirmation = confirm("Are you sure you want to delete this project?");
  if (confirmation) {
      deleteProject(projectIndex);
  }
}
function renderProjects() {
  projectsList.innerHTML = '';
  projects.forEach((project, index) => {
      const projectItem = document.createElement('li');
      projectItem.textContent = project.name;

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 1 1 4 0v2" />
      </svg>`;
      deleteButton.classList.add('delete-btn');
      deleteButton.addEventListener('click', () => confirmDeleteProject(index));

      projectItem.appendChild(deleteButton);
      projectItem.addEventListener('click', () => {
          const clickedElement = event.currentTarget;
          clickedElement.classList.add('active');
          currentProjectIndex = index;
          renderTodos(currentProjectIndex);
      });
      
      projectsList.appendChild(projectItem);
  });
}

function renderTodos(projectIndex) {
  if (projects[projectIndex]) { 
      todosList.innerHTML = '';
      const project = projects[projectIndex];
      project.todos.forEach((todo, todoIndex) => {
        const todoItem = document.createElement('li');
        const todoItemName = document.createElement('span');
        todoItemName.textContent = `${todo.title} - Due: ${todo.dueDate}`;
        todoItem.appendChild(todoItemName);

        todoItem.classList.add(getPriorityClass(todo.priority));

        if (todo.completed) {
            todoItemName.classList.add('completed-crossed-out');
        } else {
            todoItemName.classList.remove('completed-crossed-out');
        }

        if (isOverdue(todo.dueDate)) {
            todoItem.classList.add('overdue');
        }

        const completeCheckbox = document.createElement('input');
        completeCheckbox.checked = todo.completed;
        completeCheckbox.classList.add('complete-checkbox');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.addEventListener('change', () => {
            markTodoAsComplete(todo);
            renderTodos(projectIndex);
            saveToLocalStorage(projects);
        });

        const customCheckbox = document.createElement('label');
        customCheckbox.classList.add('custom-checkbox');
        customCheckbox.appendChild(completeCheckbox);
        customCheckbox.insertAdjacentHTML('beforeend', ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>`);

        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L7 20.5 3 21l.5-4L18.5 2.5z" />
        </svg>`;
        
        editButton.addEventListener('click', () => {
            openEditTodoModal(todo, projectIndex, todoIndex);
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 1 1 4 0v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        </svg>`;
        deleteButton.classList.add('delete-btn');
        
        deleteButton.addEventListener('click', () => {
            const confirmation = confirm('Are you sure you want to delete this todo?');
            if (confirmation) {
                deleteTodo(project.todos, todoIndex);
                renderTodos(projectIndex);
                saveToLocalStorage(projects);
            }
        });
        
        const actions = document.createElement('div');
        actions.classList.add('actions');
        actions.appendChild(customCheckbox);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        todoItem.appendChild(actions);
        todosList.appendChild(todoItem);
      });
  } else {
      todosList.innerHTML = ''; 
  }
}

function openEditTodoModal(todo, projectIndex, todoIndex) {
  todoModal.style.display = 'block';
  modalHeader.textContent = 'Edit Todo';
  todoTitleInput.value = todo.title;
  todoDueDateInput.value = todo.dueDate;
  todoPriorityInput.value = todo.priority;

  createTodoBtn.style.display = 'none'; 
  saveTodoBtn.style.display = 'block'; 

  saveTodoBtn.onclick = () => {
      const newTitle = todoTitleInput.value.trim();
      const newDueDate = todoDueDateInput.value;
      const newPriority = todoPriorityInput.value;

      if (newTitle && newDueDate) {
          editTodo(todo, newTitle, newDueDate, newPriority);
          renderTodos(projectIndex);
          saveToLocalStorage(projects);
          todoModal.style.display = 'none';
      } else {
          alert('Please enter a title and due date.');
      }
  };
}

newTodoBtn.addEventListener('click', () => {
  todoModal.style.display = 'block';
  modalHeader.textContent = 'Create New Todo';
  todoTitleInput.value = '';
  todoDueDateInput.value = '';
  todoPriorityInput.value = 'Low';

  saveTodoBtn.style.display = 'none'; 
  createTodoBtn.style.display = 'block'; 

  createTodoBtn.onclick = () => {
      const todoTitle = todoTitleInput.value.trim();
      const todoDueDate = todoDueDateInput.value;
      const todoPriority = todoPriorityInput.value;

      if (todoTitle && todoDueDate) {
          const newTodo = createTodo(todoTitle, 'Description', todoDueDate, todoPriority);
          projects[currentProjectIndex].todos.push(newTodo);
          renderTodos(currentProjectIndex);
          saveToLocalStorage(projects);
          todoModal.style.display = 'none';
      } else {
          alert('Please enter a todo title and due date.');
      }
  };
});

initializeProjects();
renderProjects();
renderTodos(0);
