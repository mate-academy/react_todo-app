import { Todo } from '../types/Todo';
// import { client } from '../utils/fetchClient';

export const USER_ID = 2576;
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
export const deleteTodo = (todoId: number): Promise<void> => {
  return new Promise(resolve => {
    const todos = loadTodos();
    const filteredTodos = todos.filter(todo => todo.id !== todoId);

    saveTodos(filteredTodos);
    resolve();
  });
};

export const createTodo = ({
  title,
  userId,
  completed,
}: Omit<Todo, 'id'>): Promise<Todo> => {
  return new Promise(resolve => {
    const todos = loadTodos();
    const newTodo: Todo = {
      id: Date.now(),
      title,
      userId,
      completed,
    };

    saveTodos([...todos, newTodo]);
    resolve(newTodo);
  });
};

export const updateTodo = (updated: Todo): Promise<Todo> => {
  return new Promise(resolve => {
    const todos = loadTodos();
    const updatedTodos = todos.map(todo =>
      todo.id === updated.id ? { ...todo, ...updated } : todo,
    );

    saveTodos(updatedTodos);
    resolve(updated);
  });
};
