import { useEffect, useReducer } from 'react';
import { useLocalStorage } from '../../packages/hooks';
import { STORAGE_KEY } from '../../libs/enums';
import {
  reducer,
  initialValue,
} from '../../packages/reducer';
import { DispatchContext, TodosContext } from '../../packages/context';

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [storagedTodos, setStoragedTodos]
    = useLocalStorage(STORAGE_KEY, initialValue);

  const [todos, dispatch] = useReducer(reducer, storagedTodos);

  useEffect(() => {
    setStoragedTodos(todos);
  }, [setStoragedTodos, todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
