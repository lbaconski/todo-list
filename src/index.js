import { createTodo, editTodo, deleteTodo, getPriorityClass } from './modules/todo';
import createProject from './modules/project';
import { saveToLocalStorage, loadFromLocalStorage } from './modules/storage';
import '../src/style.css';

const projectsList = document.getElementById('projects-list');
const todosList = document.getElementById('todos-list');
const newProjectBtn = document.getElementById('new-project-btn');
const newTodoBtn = document.getElementById('new-todo-btn');

let projects = [];

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
    projectItem.addEventListener('click', () => renderTodos(index));
    projectsList.appendChild(projectItem);
  });
}

function renderTodos(projectIndex) {
  todosList.innerHTML = '';
  const project = projects[projectIndex];
  project.todos.forEach((todo, todoIndex) => {
    const todoItem = document.createElement('li');
    todoItem.textContent = `${todo.title} - Due: ${todo.dueDate}`;

    todoItem.classList.add(getPriorityClass(todo.priority));

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const newTitle = prompt('Edit todo title:', todo.title);
      const newDueDate = prompt('Edit due date (YYYY-MM-DD):', todo.dueDate);
      const newPriority = prompt('Edit priority (Low, Medium, High):', todo.priority);
      if (newTitle && newDueDate && newPriority) {
        editTodo(todo, newTitle, newDueDate, newPriority);
        renderTodos(projectIndex);
        saveToLocalStorage(projects);
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTodo(project.todos, todoIndex);
      renderTodos(projectIndex);
      saveToLocalStorage(projects);
    });

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
  const projectIndex = 0;
  const todoTitle = prompt('Enter todo title:');
  const todoDueDate = prompt('Enter due date (YYYY-MM-DD):');
  const todoPriority = prompt('Enter priority (Low, Medium, High):');
  
  if (todoTitle && todoDueDate && todoPriority) {
    const newTodo = createTodo(todoTitle, 'Description', todoDueDate, todoPriority);
    projects[projectIndex].todos.push(newTodo);
    renderTodos(projectIndex);
    saveToLocalStorage(projects);
  }
});

initializeProjects();
renderProjects();
renderTodos(0);
