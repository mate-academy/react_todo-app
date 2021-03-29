export const notCompleted = todos => ((todos.length)
  ? todos.filter(todo => todo.completed === false).length
  : 0);

export const toggleAll = todos => ((!todos.length)
  ? false
  : todos.every(todo => todo.completed));
