import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom/';
import { TodoApp } from './Components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TodoApp />} />
        <Route path="active" element={<TodoApp />} />
        <Route path="completed" element={<TodoApp />} />
      </Route>
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
};
