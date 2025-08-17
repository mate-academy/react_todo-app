import { Todo } from '../types/Todo';

const STORAGE_KEY = 'todos';

function loadTodos(): Todo[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  return raw ? JSON.parse(raw) : [];
}

export const getTodos = (): Todo[] => {
  return loadTodos();
};

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Add more methods here
export const deleteTodo = (todoId: number) => {
  const todos = loadTodos();
  const filteredTodos = todos.filter(todo => todo.id !== todoId);

  saveTodos(filteredTodos);
};

export const createTodo = ({ title, completed }: Omit<Todo, 'id'>): Todo => {
  const todos = loadTodos();
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed,
  };

  saveTodos([...todos, newTodo]);

  return newTodo;
};

export const updateTodo = (updated: Todo): Todo => {
  const todos = loadTodos();
  const updatedTodos = todos.map(todo =>
    todo.id === updated.id ? { ...todo, ...updated } : todo,
  );

  saveTodos(updatedTodos);

  return updated;
};
