import React, { useMemo, useState } from 'react';
import { ListAction } from '../../Enum/ListAction';
import { Todos } from '../../Types';
import { useLocalStorage } from '../../UseLocalStorage';

type Props = {
  children: React.ReactNode;
};

type TodosContext = {
  todo: Todos[],
  setTodo: (v: Todos[]) => void,
  filter: ListAction,
  setFilter: (v: ListAction) => void,
  filterTodos: () => Todos[],
  isAllToggle: boolean;
  setIsAllToggle: (ListAction: boolean) => void,
};

export const TodoContext = React.createContext<TodosContext>({
  todo: [],
  setTodo: () => {},
  filter: ListAction.ALL,
  setFilter: () => {},
  filterTodos: () => [],
  isAllToggle: false,
  setIsAllToggle: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todo, setTodo] = useLocalStorage<Todos[]>('todo', []);
  const [filter, setFilter] = useState<ListAction>(ListAction.ALL);
  const [isAllToggle, setIsAllToggle] = useState(false);

  const filterTodos = () => {
    switch (filter) {
      case ListAction.ALL:
        return todo;
      case ListAction.ACTIVE:
        return todo.filter(todos => !todos.completed);
      case ListAction.COMPLETED:
        return todo.filter(todos => todos.completed);
      default:
        return todo;
    }
  };

  const initTodos = useMemo(() => ({
    todo,
    setTodo,
    filter,
    setFilter,
    filterTodos,
    isAllToggle,
    setIsAllToggle,
  }), [filter, todo]);

  return (
    <TodoContext.Provider value={initTodos}>
      {children}
    </TodoContext.Provider>
  );
};
