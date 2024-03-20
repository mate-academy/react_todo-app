import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { Status, Todo } from './types/types';

export const TodosContext = createContext<{
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  filterStatus: Status;
  setFilterStatus: Dispatch<SetStateAction<Status>>;
}>({
  todos: [],
  setTodos: () => {},
  filterStatus: Status.All,
  setFilterStatus: () => {},
});

export const useTodos = () => useContext(TodosContext);
