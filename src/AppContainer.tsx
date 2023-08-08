import React, { useState, useContext, useMemo } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { App } from './App';
import { FilterStatus } from './types/FilterStatus';
import { TodosContext } from './TodoContext';

export const AppContainer: React.FC = () => {
  const {
    todos,
  } = useContext(TodosContext);
  const { pathname } = useLocation();
  const [filter, setFilter] = useState(FilterStatus.all);

  useMemo(() => {
    if (pathname === '/completed') {
      setFilter(FilterStatus.completed);
    }

    if (pathname === '/active') {
      setFilter(FilterStatus.active);
    }
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <App
            visibleTodos={[...todos]}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      />

      <Route
        path={`/${FilterStatus.all}`}
        element={<Navigate to="/" replace />}
      />

      <Route
        path={`/${FilterStatus.completed}`}
        element={(
          <App
            visibleTodos={[...todos].filter(todo => todo.completed === true)}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      />

      <Route
        path={`/${FilterStatus.active}`}
        element={(
          <App
            visibleTodos={[...todos].filter(todo => todo.completed === false)}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      />

      <Route
        path="/*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};
