/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path=":filterType" element={<TodoApp />} />
      <Route path="*" element={<TodoApp />} />
    </Routes>
  );
};
