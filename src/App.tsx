import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';
import { TodoPage } from './components/TodoPage';

export const App: React.FC = () => (
  <Routes>
    <Route path="/">
      <Route index element={<TodoPage />} />
      <Route path="/active" element={<TodoPage />} />
      <Route path="/completed" element={<TodoPage />} />
    </Route>
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
