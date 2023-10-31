import React, { useState } from 'react';
import { todos } from './todos';

type Todo = {
  title: string;
  id: number;
  completed: boolean;
};

type Context = {
  newTodo: Todo;
  newTodos: Todo[];
  handleOnSubmit: (e: React.FormEvent) => void;
  handleNewTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAllCheckedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allChecked: boolean;
};

export const TodosContext = React.createContext<Context>({
  newTodo: {
    title: '',
    id: 0,
    completed: false,
  },
  newTodos: [],
  handleOnSubmit: () => {},
  handleNewTodoChange: () => {},
  handleAllCheckedChange: () => {},
  allChecked: false,
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [newTodos, setNewTodos] = useState(todos);
  const [newTodo, setNewTodo] = useState<Todo>({
    title: '',
    id: +new Date(),
    completed: false,
  });
  const [allChecked, setAllChecked] = useState(false);

  const handleAllCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllChecked(e.target.checked);
  };

  const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: e.target.value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNewTodos((currentTodos) => [...currentTodos, newTodo]);

    setNewTodo({
      title: '',
      id: +new Date(),
      completed: false,
    });
  };

  const contextValue = {
    newTodo,
    newTodos,
    handleOnSubmit,
    handleNewTodoChange,
    handleAllCheckedChange,
    allChecked,
  };

  return (
    <TodosContext.Provider
      value={contextValue}
    >
      {children}
    </TodosContext.Provider>
  );
};
