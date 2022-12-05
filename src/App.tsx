import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';
import { Status } from './types/Status';

export const App: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <TodoApp selectedFilter={Status.ALL} />
      }
    />

    <Route
      path="/active"
      element={
        <TodoApp selectedFilter={Status.ACTIVE} />
      }
    />

    <Route
      path="/completed"
      element={
        <TodoApp selectedFilter={Status.COMPLETED} />
      }
    />

    <Route
      path="*"
      element={(
        <Navigate to="/" />
      )}
    />

  </Routes>
);
