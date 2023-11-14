import React from 'react';
import { Todo } from '../../types/todoTypes';
import { Status } from '../../types/enumTypes';

type Props = {
  preparedTodos: Todo[];
  todos: Todo[];
  setTodos: (newTodos: Todo[]) => void;
  filterBy: string;
  setFilterBy: (item: Status) => void;
};

export const TodoContext = React.createContext<Props>({
  preparedTodos: [],
  todos: [],
  setTodos: () => { },
  filterBy: '',
  setFilterBy: () => { },
});
