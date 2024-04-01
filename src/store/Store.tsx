import React, { createContext, useContext, useMemo, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { FilterBy } from '../types/FilterBy';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  filteredTodos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  setFilter: (filter: FilterBy) => void;
  filter: FilterBy;
  updateTitleTodo: (title: string, id: number) => void;
  todos: Todo[];
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(FilterBy.ALL);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    const updateTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updateTodos);
  };

  const toggleTodo = (id: number) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);

    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const updateTodos = todos.filter(todo => !todo.completed);

    setTodos(updateTodos);
  };

  const updateTitleTodo = (title: string, id: number) => {
    const updateTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title } : todo,
    );

    setTodos(updateTodos);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterBy.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilterBy.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filter, todos]);

  return (
    <TodoContext.Provider
      value={{
        filteredTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        toggleAll,
        clearCompleted,
        setFilter,
        filter,
        updateTitleTodo,
        todos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};

export default TodoContext;
