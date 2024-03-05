import React, {
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Actions } from '../types/Actions';
import { reducer } from '../components/utils/reducer';

export const TodoContext = React.createContext<{ todos: Todo[] } | null>(null);
export const DispatchContext = React.createContext<{
  dispatch: Dispatch<Actions>;
} | null>(null);

type GlobalContextProps = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: GlobalContextProps) => {
  const { state: todos, setState: setTodos } = useLocalStorage<Todo[]>(
    'todos',
    [],
  );

  const [state, dispatch] = useReducer(reducer, todos);

  const contextValue = useMemo(
    () => ({
      todos,
    }),
    [todos],
  );

  const dispatchValue = useMemo(
    () => ({
      dispatch,
    }),
    [],
  );

  useEffect(() => {
    setTodos(state);
  }, [state, setTodos]);

  return (
    <TodoContext.Provider value={contextValue}>
      <DispatchContext.Provider value={dispatchValue}>
        {children}
      </DispatchContext.Provider>
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const value = useContext(TodoContext);

  if (value === null) {
    throw new Error('Missing context provider');
  }

  return value;
};

export const useDispatchContext = () => {
  const value = useContext(DispatchContext);

  if (value === null) {
    throw new Error('Missing context provider');
  }

  return value;
};
