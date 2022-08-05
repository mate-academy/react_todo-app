import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodoApp } from './component/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Routes>
        <Route path="/">
          <Route index element={<TodoApp />} />
          <Route path="active" element={<TodoApp />} />
          <Route path="completed" element={<TodoApp />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  );
};
