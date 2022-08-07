import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './TodoApp';

export const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />} />
      <Route path="/completed" element={<TodoApp />} />
      <Route path="/active" element={<TodoApp />} />
    </Routes>
  );
};
