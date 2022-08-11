/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />} />
      <Route path="/completed" element={<TodoApp />} />
      <Route path="/active" element={<TodoApp />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<h1>Error 404 - Page is not found</h1>} />
    </Routes>
  );
};
