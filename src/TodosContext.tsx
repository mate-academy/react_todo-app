import React, { useEffect, useState } from 'react';
import { Todos } from './types/types';

type TodosContextType = {
  todos: Todos[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
  handleCompleted: (id: number) => void;
  handleCompleteAll: () => void;
  filterActive: () => void;
  filtredCompleted: () => void;
};

const initialTodosContextValue: TodosContextType = {
  todos: [],
  setTodos: () => {},
  handleCompleted: () => {},
  handleCompleteAll: () => {},
  filterActive: () => {},
  filtredCompleted: () => {},
};

export const TodosContext = React.createContext<TodosContextType>(
  initialTodosContextValue,
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [filtredItem, setFiltredItem] = useState<Todos[]>([]);

  useEffect(() => {
    setFiltredItem(todos);
  }, [todos]);

  const filterActive = () => {
    const filtredActive = filtredItem.filter(todo => !todo.completed);

    setFiltredItem(filtredActive);
  };

  const filtredCompleted = () => {
    const filtrCompleted = filtredItem.filter(todo => todo.completed);

    setFiltredItem(filtrCompleted);
  };

  const handleCompleted = (id: number) => {
    const newStateTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(newStateTodos);
  };

  const handleCompleteAll = () => {
    const hasIncomplete = todos.some(todo => !todo.completed);

    const newStateTodos = todos.map(todo => ({
      ...todo,
      completed: !!hasIncomplete,
    }));

    setTodos(newStateTodos);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        handleCompleted,
        handleCompleteAll,
        filterActive,
        filtredCompleted,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
