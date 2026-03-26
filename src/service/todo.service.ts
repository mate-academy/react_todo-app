import { Todo } from '../types/Todo';

const TODOS_KEY = 'todos';

const saveTodos = (todos: Todo[]) => {
  if (!todos) {
    localStorage.setItem(TODOS_KEY, '[]');
  } else {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }
};

const getStoredTodos = (): Todo[] => {
  const todosAsJson = localStorage.getItem(TODOS_KEY);

  if (!todosAsJson) {
    saveTodos([]);
  }

  return todosAsJson ? JSON.parse(todosAsJson) : [];
};

export const addTodo = (todo: Todo) => {
  const todos = getStoredTodos();

  saveTodos([...todos, todo]);
};

export const removeTodo = (id: number) => {
  const todos = getStoredTodos();

  saveTodos(todos.filter(todo => todo.id !== id));
};

export const toggleTodo = (id: number) => {
  const todos = getStoredTodos();

  saveTodos(
    todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  );
};

export const editTodo = (updatedTodo: Todo) => {
  const todos = getStoredTodos();

  saveTodos(
    todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
  );
};

export const getTodoById = (id: number) => {
  return getStoredTodos().find(todo => todo.id === id);
};

export const getTodos = () => {
  return getStoredTodos();
};
