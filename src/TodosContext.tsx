import { Dispatch, SetStateAction, createContext } from 'react';
import { Todo } from './types/Todo';

export type TodoContextType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>,
};

export const TodosContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});
