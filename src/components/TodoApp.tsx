import React, {
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  DispatchContext,
  TodosContext,
} from '../store/TodosContextProvider';

import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { Status } from '../types/Status';

export const TodoApp: React.FC = () => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const [filterBy, setFilterBy] = useState(Status.ALL);

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: 'clearCompleted' });
  }, [dispatch]);

  const handleFilteredTodos = useCallback((newFilter: Status) => {
    setFilterBy(newFilter);
  }, []);

  const getVisibleTodos = () => {
    switch (filterBy) {
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Status.COMPLETED:
        return todos.filter(todo => todo.completed);
      case Status.ALL:
      default:
        return todos;
    }
  };

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <>
          <Main items={getVisibleTodos()} />

          <Footer
            handleFilteredTodos={handleFilteredTodos}
            handleClearCompleted={handleClearCompleted}
          />
        </>
      )}
    </div>
  );
};
