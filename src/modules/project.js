const createProject = (name) => {
    let todos = [];
    return { name, todos };
  };
  
  
  const filterCompletedTodos = (project) => {
    return project.todos.filter(todo => todo.completed);
  }
  
  export default { createProject, filterCompletedTodos };
  