const createProject = (name, color) => {
  let todos = [];
  return { name, color, todos }; 
};

  const filterCompletedTodos = (project) => {
    return project.todos.filter(todo => todo.completed);
  }
  
  export default { createProject, filterCompletedTodos };
  