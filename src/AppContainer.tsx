import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { FilterStatus } from './types/FilterStatus';
import { useTodo } from './TodoContext';

export const AppContainer: React.FC = () => {
  const {
    todos,
  } = useTodo();

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <App
            visibleTodos={[...todos]}
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
            visibleTodos={todos.filter(todo => todo.completed === true)}
          />
        )}
      />

      <Route
        path={`/${FilterStatus.active}`}
        element={(
          <App
            visibleTodos={todos.filter(todo => todo.completed === false)}
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
