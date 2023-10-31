import {
  Dispatch,
  SetStateAction,
  createContext,
} from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export type TodoContextType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>,
};

export const TodosContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  status: Status.all,
  setStatus: () => {},
});
