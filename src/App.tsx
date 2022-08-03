import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoPage from './components/pages/TodoPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TodoPage />} />
        <Route path="active" element={<TodoPage />} />
        <Route path="completed" element={<TodoPage />} />
      </Route>
    </Routes>
  );
};
