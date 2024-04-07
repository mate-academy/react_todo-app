export const getTodosFromLocalStorage = () => {
  const data = localStorage.getItem('todos');

  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  return [];
};
