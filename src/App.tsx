import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />}>
        <Route index />
        <Route path="/active" element={<TodoApp />} />
        <Route path="/completed" element={<TodoApp />} />
      </Route>
    </Routes>
  );
};
