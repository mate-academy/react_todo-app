import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <TodoApp selectedFilter={FilterStatus.ALL} />
      }
    />

    <Route
      path="/active"
      element={
        <TodoApp selectedFilter={FilterStatus.ACTIVE} />
      }
    />

    <Route
      path="/completed"
      element={
        <TodoApp selectedFilter={FilterStatus.COMPLETED} />
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
