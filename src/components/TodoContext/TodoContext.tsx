import React from 'react';
import { Todo } from '../../types/todoTypes';

type Props = {
  preparedTodos: Todo[];
  todos: Todo[];
  setTodos: (newTodos: Todo[]) => void;
  filterBy: string;
  setFilterBy: (item: string) => void;
};

export const TodoContext = React.createContext<Props>({
  preparedTodos: [],
  todos: [],
  setTodos: () => { },
  filterBy: '',
  setFilterBy: () => { },
});
