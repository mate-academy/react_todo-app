import React, { useState } from 'react';
import { FilterOptions } from '../types/FilterOptions';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  todos: Todo[];
  filter: FilterOptions;
  setTodos: (newTodo: Todo[]) => void;
  setFilter: (filter: FilterOptions) => void;
  handleCheckboxClick: (id: number, completed: boolean) => void;
  getVisibleTodos: () => Todo[];
  handleDelete: (id: number) => void;
  findTodo: (id: number, newTitle: string) => Todo[];
}

interface ProviderProps {
  children: React.ReactNode;
}

export const TodosContext = React.createContext<Props>({
  todos: [],
  filter: FilterOptions.All,
  setTodos: () => { },
  setFilter: () => { },
  handleCheckboxClick: () => { },
  getVisibleTodos: () => [],
  handleDelete: () => { },
  findTodo: () => [],
});

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);

  const handleCheckboxClick = (id: number, completed: boolean) => {
    setTodos(todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return { ...currentTodo, completed: !completed };
      }

      return currentTodo;
    }));
  };

  const getVisibleTodos = () => {
    switch (filter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);

      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(currentTodo => currentTodo.id !== id));
  };

  const findTodo = (id: number, newTitle: string) => {
    return todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return { ...currentTodo, title: newTitle };
      }

      return currentTodo;
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        filter,
        setTodos,
        setFilter,
        handleCheckboxClick,
        getVisibleTodos,
        handleDelete,
        findTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
