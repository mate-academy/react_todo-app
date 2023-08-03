import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks';
import { Status } from '../Enum/Status';

type TodoContext = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  filterBy: Status;
  setFilterBy: (status: Status) => void;
  todosFilter: () => Todo[];
};

export const TodosContext = React.createContext<TodoContext>({} as TodoContext);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterBy, setFilterBy] = useState<Status>(Status.ALL);

  const todosFilter = () => {
    switch (filterBy) {
      case Status.ALL:
        return todos;
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Status.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const value = useMemo(() => ({
    todos,
    setTodos,
    todosFilter,
    setFilterBy,
    filterBy,
  }), [todos, filterBy]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
