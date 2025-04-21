import React, { createContext, useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  updateTodo: (id: number, title: string) => void;
  toggleAll: () => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  activeTodosCount: number;
  completedTodosCount: number;
  loading: boolean;
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  title: string;
  setTitle: (value: string) => void;
  setError: (value: string | null) => void;
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
);

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoTitle: string) => {
    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    setLoading(true);

    const newTodo: Todo = {
      userId: 1,
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setLoading(false);
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const updateTodo = (id: number, newTitle: string, completed?: boolean) => {
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(id);

      return;
    }

    setTodos(prev =>
      prev.map(todo => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          title: trimmedTitle,
          completed: completed ?? todo.completed,
        };
      }),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    addTodo(title);
    setTitle('');
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
        filter,
        setFilter,
        activeTodosCount,
        completedTodosCount,
        loading,
        submitForm,
        error,
        title,
        setTitle,
        setError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
