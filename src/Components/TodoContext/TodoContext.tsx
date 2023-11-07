import React, {
  Dispatch,
  createContext,
  useContext,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { Action } from '../../types/Action';
import { Status } from '../../types/Status';
import { useLocalStorage } from '../CustomHooks/useLOcalStorage';

const initialTodos: Todo[] = [];

type TodosContextType = {
  todos: Todo[];
  filter: Status;
  setFilter: Dispatch<React.SetStateAction<Status>>;
  dispatch: Dispatch<Action>;
};

export const TodosContext = createContext<TodosContextType>({
  todos: initialTodos,
  filter: Status.All,
  setFilter: () => {},
  dispatch: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocalStorage('todos', initialTodos);
  const [filter, setFilter] = useState(Status.All);

  return (
    <TodosContext.Provider
      value={{
        todos,
        filter,
        setFilter,
        dispatch,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export function useTodos() {
  return useContext(TodosContext).todos;
}

export function useTodosDispatch() {
  return useContext(TodosContext).dispatch;
}

export function useTodosFilter() {
  const { filter, setFilter } = useContext(TodosContext);

  return { filter, setFilter };
}
