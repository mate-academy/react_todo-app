import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from '../types/TodoFilter';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  updateTodoTitle: (id: number, title: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  focusInput: () => void;
};

const defaultContextValue: TodoContextType = {
  todos: [],
  setTodos: () => {},
  removeTodo: () => {},
  clearCompleted: () => {},
  filter: 'all',
  setFilter: () => {},
  toggleTodo: () => {},
  toggleAll: () => {},
  updateTodoTitle: () => {},
  inputRef: { current: null },
  focusInput: () => {},
};

export const TodoContext = createContext<TodoContextType>(defaultContextValue);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem('todos');

      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (e) {
      return [];
    }
  });
  const [filter, setFilter] = useState<TodoFilter>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const focusInput = () => inputRef.current?.focus();

  const removeTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    focusInput();
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    focusInput();
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, completed: !allCompleted })),
    );
  };

  const updateTodoTitle = (id: number, title: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        filter,
        setFilter,
        removeTodo,
        clearCompleted,
        toggleTodo,
        toggleAll,
        updateTodoTitle,
        inputRef,
        focusInput,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
