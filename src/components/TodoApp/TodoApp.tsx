import React, {
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  DispatchContext,
  TodosContext,
} from '../GlobalContextProvider';
import { Header } from '../Header';
import { Main } from '../Main';
import { Footer } from '../Footer';

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
