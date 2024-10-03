import { Todo } from '../types/Todo';

export const getTodosFromStorage = () => {
  const storedItems = localStorage.getItem('todos');

  if (storedItems) {
    return JSON.parse(storedItems);
  }

  return [];
};

export const addTodoToStorage = (todo: Todo) => {
  const todos = getTodosFromStorage();

  localStorage.setItem('todos', JSON.stringify([...todos, todo]));
};

export const deleteTodoFromStorage = (id: number) => {
  const todos = getTodosFromStorage();
  const newTodos = todos.filter((todo: Todo) => todo.id !== id);

  localStorage.setItem('todos', JSON.stringify(newTodos));
};

export const patchTodoFromStorage = (id: number, data: Omit<Todo, 'id'>) => {
  const todos = getTodosFromStorage();
  const newTodos = todos.map((todo: Todo) => {
    if (todo.id === id) {
      return { ...todo, ...data };
    } else {
      return todo;
    }
  });

  localStorage.setItem('todos', JSON.stringify(newTodos));
};
