import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<TodoApp />}
      >
        <Route index />
        <Route
          path="/active"
          element={<TodoApp />}
        />
        <Route
          path="/completed"
          element={<TodoApp />}
        />
      </Route>

      <Route
        path="*"
        element={(
          <Navigate to="/" />
        )}
      />
    </Routes>
  );
};
