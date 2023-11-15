import React, {
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

interface ITodoContext {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  removeTodo: (id: number) => void;
  setFilterStatus: Dispatch<SetStateAction<Status>>;
  visibleTodos: Todo[];
}

export const defaultValue: ITodoContext = {
  todos: [],
  setTodos: () => {},
  removeTodo: () => {},
  setFilterStatus: () => {},
  visibleTodos: [],
};

export const TodoContext = React.createContext<ITodoContext>(defaultValue);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case Status.Active:
        return todos.filter((todo) => todo.status === Status.Active);
      case Status.Completed:
        return todos.filter((todo) => todo.status === Status.Completed);
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  const removeTodo = (id: number) => {
    const removeTodos = todos.filter((todo) => todo.id !== id);

    setTodos(removeTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        removeTodo,
        setTodos,
        setFilterStatus,
        visibleTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
