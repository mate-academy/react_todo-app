import React from 'react';
import { TodosFilter } from '../types/TodosFilter';
import Todo from '../types/Todo';

type Props = {
  todos: Todo[],
  todosFilter: TodosFilter,
  todoEditId: number,
  todoEdit: string,
  setTodos: (todos: Todo[]) => void,
  setTodosFilter: (filter: TodosFilter) => void,
  setTodoEditId: (id: number) => void,
  setTodoEdit: (edit: string) => void,
};

export const TodosContext = React.createContext<Props>({
  todos: [],
  todosFilter: TodosFilter.all,
  todoEditId: 0,
  todoEdit: 'string',
  setTodos: () => {},
  setTodosFilter: () => {},
  setTodoEditId: () => {},
  setTodoEdit: () => {},
});
