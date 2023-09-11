import React, { useState } from 'react';
import { Todo } from './types/todo';
import { initialTodo } from './utils/initialTodo';

export const TodosContext = React.createContext({
  todos: [initialTodo],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTodos: (_todos: Todo[]): void => { },
});

type Props = {
  children: React.ReactNode,
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState([] as Todo[]);

  // const addNewTodo = (todo: Todo) => {
  //   const newTodos = [...todos];

  //   newTodos.push(todo);
  //   setTodos(newTodos);
  // };

  const value = {
    todos,
    setTodos,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
