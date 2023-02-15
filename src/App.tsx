import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />}>
        <Route index element={<TodoApp />} />
        <Route path="/completed" element={<TodoApp />} />
        <Route path="/active" element={<TodoApp />} />
      </Route>
      <Route
        path="*"
        element={
          <p>Page not found</p>
        }
      />
    </Routes>
  );
};
