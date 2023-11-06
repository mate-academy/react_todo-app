import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

type TodosContextType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  filteredType: Status,
  setFilteredType: Dispatch<SetStateAction<Status>>;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => { },
  filteredType: Status.All,
  setFilteredType: () => { },
});
