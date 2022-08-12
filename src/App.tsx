import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom/';
import { TodoApp } from './Components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />}>
        <Route index element={<TodoApp />} />
        <Route path=":storage" element={<TodoApp />} />
      </Route>
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
};
