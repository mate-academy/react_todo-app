import { Todo } from '../types/Todo';

const STORAGE_KEY = 'todos';

const getTodos = (): Todo[] => {
  const raw = localStorage.getItem(STORAGE_KEY);

  return raw ? JSON.parse(raw) : [];
};

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const todoStorage = {
  getTodos(): Todo[] {
    if (!localStorage[STORAGE_KEY]) {
      localStorage.setItem(STORAGE_KEY, '[]');
    }

    return getTodos();
  },

  addTodo(todo: Omit<Todo, 'id'>): Todo {
    const todos = getTodos();

    const newTodo: Todo = {
      ...todo,
      id: +Date.now(),
    };

    saveTodos([...todos, newTodo]);

    return newTodo;
  },

  deleteTodo(id: number): void {
    const todos = getTodos().filter(todo => todo.id !== id);

    saveTodos(todos);
  },

  updateTodo(
    id: number,
    data: Partial<Pick<Todo, 'title' | 'completed'>>,
  ): Todo {
    const todos = getTodos();

    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, ...data } : todo,
    );

    saveTodos(updatedTodos);

    return updatedTodos.find(todo => todo.id === id)!;
  },
};
