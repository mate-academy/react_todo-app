import React, { useState, createContext, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { FilterParams } from '../types/Filter';

type ContextProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  title: string;
  setTitle: (title: string) => void;
  filterButton: FilterParams;
  setFilterButton: (filterParams: FilterParams) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodoStatus: (id: number) => void;
  clearCompletedTodos: () => void;
};

const initialContext: ContextProps = {
  todos: [],
  setTodos: () => {},
  title: '',
  setTitle: () => {},
  filterButton: FilterParams.ALL,
  setFilterButton: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodoStatus: () => {},
  clearCompletedTodos: () => {},
};

export const Context = createContext<ContextProps>(initialContext);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [filterButton, setFilterButton] = useState<FilterParams>(
    FilterParams.ALL,
  );

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodoTitle: string) => {
    if (newTodoTitle.trim() !== '') {
      const newTodo: Todo = {
        id: +new Date(),
        title: newTodoTitle.trim(),
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];

      setTodos(updatedTodos);
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);

    setTodos(updatedTodos);
  };

  const toggleTodoStatus = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  const clearCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <Context.Provider
      value={{
        todos,
        setTodos,
        title,
        setTitle,
        filterButton,
        setFilterButton,
        addTodo,
        deleteTodo,
        toggleTodoStatus,
        clearCompletedTodos,
      }}
    >
      {children}
    </Context.Provider>
  );
};
