const createTodo = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority, completed: false };
  };
  
  const editTodo = (todo, newTitle, newDueDate, newPriority) => {
    todo.title = newTitle;
    todo.dueDate = newDueDate;
    todo.priority = newPriority;
    return todo;
  };
  
  const deleteTodo = (todosArray, todoIndex) => {
    todosArray.splice(todoIndex, 1);
  };
  
  export { createTodo, editTodo, deleteTodo };
  