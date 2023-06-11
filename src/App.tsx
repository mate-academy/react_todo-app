/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TodoApp } from './TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />}>
        <Route path="/:filter" element={<TodoApp />} />
      </Route>
    </Routes>

  );
};
