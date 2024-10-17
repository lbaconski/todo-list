import createTodo from './modules/todo';
import createProject from './modules/project';
import '../src/style.css';


const projectsList = document.getElementById('projects-list');
const todosList = document.getElementById('todos-list');
const newProjectBtn = document.getElementById('new-project-btn');
const newTodoBtn = document.getElementById('new-todo-btn');

let projects = [];

const defaultProject = createProject('Default Project');
projects.push(defaultProject);

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
    project.todos.forEach((todo) => {
      const todoItem = document.createElement('li');
      todoItem.textContent = `${todo.title} - Due: ${todo.dueDate}`;
      todosList.appendChild(todoItem);
    });
  }

  newProjectBtn.addEventListener('click', () => {
    const projectName = prompt('Enter new project name:');
    if (projectName) {
      const newProject = createProject(projectName);
      projects.push(newProject);
      renderProjects();
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
  }
});

renderProjects();
renderTodos(0); 