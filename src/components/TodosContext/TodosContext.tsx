import {
  Dispatch,
  createContext,
  useContext,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useLocalStorage } from '../../CustomHooks/useLocalStorage';
import { Action } from '../../types/Action';

const intitialTodos: Todo[] = [];

export const TodosContex = createContext(intitialTodos);
export const TodosDispatchContext = createContext<Dispatch<Action>>(
  () => {},
);
export const FilterContext = createContext<{
  filter: Status;
  setFilter: Dispatch<React.SetStateAction<Status>>;
}>({
  filter: Status.All,
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocalStorage('todo', intitialTodos);
  const [filter, setFilter] = useState(Status.All);

  return (
    <TodosContex.Provider value={todos}>
      <FilterContext.Provider value={{ filter, setFilter }}>
        <TodosDispatchContext.Provider value={dispatch}>
          {children}
        </TodosDispatchContext.Provider>
      </FilterContext.Provider>
    </TodosContex.Provider>
  );
};

export function useTodos() {
  return useContext(TodosContex);
}

export function useTodosDispatch() {
  return useContext(TodosDispatchContext);
}

export function useTodosFilter() {
  return useContext(FilterContext);
}
