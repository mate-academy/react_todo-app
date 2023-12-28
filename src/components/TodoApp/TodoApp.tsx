import React, {
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  DispatchContext,
  TodosContext,
} from '../../store/GlobalContextProvider';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Main } from '../Main';

export const TodoApp: React.FC = () => {
  const todos = useContext(TodosContext);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const dispatch = useContext(DispatchContext);

  const handleClearCompleted = useCallback(
    () => {
      dispatch({ type: 'clearCompleted' });
    },
    [dispatch],
  );

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <>
          <Main items={visibleTodos} />

          <Footer
            setVisibleTodos={setVisibleTodos}
            handleClearCompleted={handleClearCompleted}
          />
        </>
      )}
    </div>
  );
};
