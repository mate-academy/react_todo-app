import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import { Todo } from '../types/todo';

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  updateTodo: (id: number, updatedFields: Partial<Todo>) => void;
  toggleAll: () => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // ініціалізуємо стан із localStorage (або порожнім масивом, якщо нічого немає)
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos'); // 🔑 Ключ, який шукають тести

    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useTodo must be used within a TodoProvider', error);
      }
    }

    return [];
  });

  // при збереженні
  useEffect(() => {
    if (todos.length === 0) {
      localStorage.removeItem('todos');
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const updateTodo = (id: number, updatedFields: Partial<Todo>) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, ...updatedFields } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const isAllCompleted = todos.every(todo => todo.completed);

    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !isAllCompleted,
      })),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        updateTodo,
        toggleAll,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo має використовуватися всередині TodoProvider');
  }

  return context;
};
