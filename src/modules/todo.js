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


  function getPriorityClass(priority) {
    if (priority === 'High') return 'high-priority';
    if (priority === 'Medium') return 'medium-priority';
    return 'low-priority';
  }

  const markTodoAsComplete = (todo) => {
    todo.completed = !todo.completed;
  }
  
  const isOverdue = (dueDate) => {
    const today = new Date();
    return new Date(dueDate) < today;
  }

  export { createTodo, editTodo, deleteTodo, getPriorityClass, markTodoAsComplete, isOverdue };
  