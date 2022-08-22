export const getLocalTodos = (setTodos: (arg0: any) => void) => {
  if (localStorage.getItem('todos') === null) {
    localStorage.setItem('todos', JSON.stringify([]));
  } else {
    setTodos(JSON.parse(localStorage.getItem('todos') || ''));
  }
};
