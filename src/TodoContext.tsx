import React, { createContext, useContext, useState, useEffect } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type FilterType = 'all' | 'active' | 'completed';

type TodoContextType = {
  todos: Todo[];
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  updateTodo: (id: number, title: string) => void;
  focusNewTodo: boolean;
  setFocusNewTodo: (value: boolean) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [filter, setFilter] = useState<FilterType>('all');
  const [focusNewTodo, setFocusNewTodo] = useState(todos.length === 0);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    setFocusNewTodo(true);
  };

  const toggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    setTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        completed: !areAllCompleted,
      })),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    setFocusNewTodo(true);
  };

  const updateTodo = (id: number, title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } else {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, title: trimmedTitle } : todo,
        ),
      );
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        toggleAll,
        updateTodo,
        focusNewTodo,
        setFocusNewTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }

  return context;
};
