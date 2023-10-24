import {
  Dispatch,
  SetStateAction,
} from 'react';

export type Todo = {
  id: string,
  title: string,
  completed: boolean,
};

export type Todos = {
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
  filterType: EStatus,
  setFilterType: Dispatch<SetStateAction<EStatus>>;
};

export enum EStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type Props = {
  children: React.ReactNode
};
