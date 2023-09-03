import { SetStateAction } from 'react';
import { Status } from './Status';
import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[],
  setTodos: (v: Todo[]) => void,
  filteredTodos: (v: string) => Todo[],
  status: string,
  setStatus: React.Dispatch<SetStateAction<Status>>,
};
