export const useLocalStorage = () => {
  const todosFromLocaleStorage = localStorage.getItem('todos');

  try {
    return todosFromLocaleStorage ? JSON.parse(todosFromLocaleStorage) : [];
  } catch {
    return [];
  }
};
