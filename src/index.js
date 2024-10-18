import { createTodo, editTodo, deleteTodo, getPriorityClass, markTodoAsComplete, isOverdue } from './modules/todo';
import { saveToLocalStorage, loadFromLocalStorage } from './modules/storage';
import '../src/style.css';
import projectUtils from './modules/project';

const { createProject, filterCompletedTodos } = projectUtils;

const projectsList = document.getElementById('projects-list');
const todosList = document.getElementById('todos-list');
const newProjectBtn = document.getElementById('new-project-btn');
const newTodoBtn = document.getElementById('new-todo-btn');

let projects = [];
let currentProjectIndex = 0;

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) && !isNaN(new Date(dateString).getTime());
  }

function initializeProjects() {
    const storedProjects = loadFromLocalStorage();
    if (storedProjects) {
        projects = storedProjects;
    } else {
        const defaultProject = createProject('Default Project');
        projects.push(defaultProject);
    }
}

function renderProjects() {
    projectsList.innerHTML = '';
    projects.forEach((project, index) => {
      const projectItem = document.createElement('li');
      projectItem.textContent = project.name;
      projectItem.addEventListener('click', () => {
        currentProjectIndex = index;
        renderTodos(currentProjectIndex);
      });
      projectsList.appendChild(projectItem);
    });
  }

function renderTodos(projectIndex) {
    todosList.innerHTML = '';
    const project = projects[projectIndex];
    project.todos.forEach((todo, todoIndex) => {
        const todoItem = document.createElement('li');
        const todoItemName = document.createElement('span')
        todoItemName.textContent = `${todo.title} - Due: ${todo.dueDate}`;
        todoItem.appendChild(todoItemName)

        todoItem.classList.add(getPriorityClass(todo.priority));

        if (todo.completed) {
            todoItemName.classList.add('completed-crossed-out')
        } else {
          todoItemName.classList.remove('completed-crossed-out')
        }
        if (isOverdue(todo.dueDate)) {
            todoItem.classList.add('overdue')
          }
        
        const completeCheckbox = document.createElement('input');
        completeCheckbox.checked = todo.completed; 
        completeCheckbox.classList.add('complete-checkbox')
        completeCheckbox.type = 'checkbox';
        completeCheckbox.addEventListener('change', () => {
            markTodoAsComplete(todo);
            renderTodos(projectIndex);
            saveToLocalStorage(projects);
        });
        const customCheckbox = document.createElement('label');
        customCheckbox.classList.add('custom-checkbox');
        customCheckbox.appendChild(completeCheckbox);
        customCheckbox.insertAdjacentHTML('beforeend',` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`
)

        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.innerHTML = `    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L7 20.5 3 21l.5-4L18.5 2.5z" />
    </svg>`
        editButton.addEventListener('click', () => {
          const newTitle = prompt('Edit todo title:', todo.title);
          const newDueDate = prompt('Edit due date (YYYY-MM-DD):', todo.dueDate);
          const newPriority = prompt('Edit priority (Low, Medium, High):', todo.priority);
          if (newTitle && newDueDate && newPriority) {
            if (isValidDate(newDueDate)) {
              editTodo(todo, newTitle, newDueDate, newPriority);
              renderTodos(projectIndex);
              saveToLocalStorage(projects);
            } else {
              alert('Please enter a valid date (YYYY-MM-DD).');
            }
          }
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 1 1 4 0v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>`
    deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            deleteTodo(project.todos, todoIndex);
            renderTodos(projectIndex);
            saveToLocalStorage(projects);
        });

        todoItem.appendChild(customCheckbox);
        todoItem.appendChild(editButton);
        todoItem.appendChild(deleteButton);
        todosList.appendChild(todoItem);
    });
}

newProjectBtn.addEventListener('click', () => {
    const projectName = prompt('Enter new project name:');
    if (projectName) {
        const newProject = createProject(projectName);
        projects.push(newProject);
        renderProjects();
        saveToLocalStorage(projects);
    }
});

newTodoBtn.addEventListener('click', () => {
  const todoTitle = prompt('Enter todo title:');
  const todoDueDate = prompt('Enter due date (YYYY-MM-DD):');
  const todoPriority = prompt('Enter priority (Low, Medium, High):');
  
  if (todoTitle && todoDueDate && todoPriority) {
    if (isValidDate(todoDueDate)) {
      const newTodo = createTodo(todoTitle, 'Description', todoDueDate, todoPriority);
      projects[currentProjectIndex].todos.push(newTodo);
      renderTodos(currentProjectIndex);
      saveToLocalStorage(projects);
    } else {
      alert('Please enter a valid date (YYYY-MM-DD).');
    }
  }
});

initializeProjects();
renderProjects();
renderTodos(0);
