import React, { useContext, createContext } from 'react';
import { Todo } from '../types/Todo';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const defaultContext: TodosContextType = {
  todos: [],
  setTodos: () => {},
};

export const TodosContext = createContext<TodosContextType>(defaultContext);

export const useTodos = () => {
  return useContext(TodosContext);
};
