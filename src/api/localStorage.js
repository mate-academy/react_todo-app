export const loadTodos = () => {
  try {
    const serializedState = localStorage.getItem('todos');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveTodos = (todos) => {
  try {
    const serializedState = JSON.stringify(todos);

    localStorage.setItem('todos', serializedState);
  } catch {
    // ignore write errors
  }
};
