// TodosContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Todo } from '../types/Todo';
import { TodosFilter } from '../types/TodosFilter';

interface Props {
  children: ReactNode;
}

type TodosContextProps = {
  todos: Todo[];
  todosFilter: TodosFilter;
  todoEditId: number;
  todoEdit: string;
  setTodos: (updater: (prevTodos: Todo[]) => Todo[]) => void;
  setTodosFilter: (filter: TodosFilter) => void;
  setTodoEditId: (id: number) => void;
  setTodoEdit: (edit: string) => void;
};

export const TodosContext
= createContext<TodosContextProps | undefined>(undefined);

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFilter, setTodosFilter] = useState<TodosFilter>(TodosFilter.all);
  const [todoEditId, setTodoEditId] = useState<number>(0);
  const [todoEdit, setTodoEdit] = useState<string>('');

  const contextValue: TodosContextProps = {
    todos,
    todosFilter,
    todoEditId,
    todoEdit,
    setTodos,
    setTodosFilter,
    setTodoEditId,
    setTodoEdit,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
