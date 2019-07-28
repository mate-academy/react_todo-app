export const getTodoToggle = (todos, todoId) => (
  todos.map(todo => (
    todo.id !== todoId
      ? todo
      : { ...todo, completed: !todo.completed }
  ))
);

export const getAllToggle = (todos, allToggle) => (
  todos.map(todo => (
    allToggle === false
      ? { ...todo, completed: true }
      : { ...todo, completed: false }
  ))
);
