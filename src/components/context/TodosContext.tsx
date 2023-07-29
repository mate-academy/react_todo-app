import React from 'react';
import { Todo } from '../../types/Todo';

type TodosType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
};

export const TodosContext = React.createContext<TodosType>({
  todos: [],
  setTodos: () => {},
});
