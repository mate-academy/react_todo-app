/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodoCreate } from './components/TodoCreate';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Routes>
        <Route path="/">
          <Route index element={<TodoCreate />} />
          <Route path="active" element={<TodoCreate />} />
          <Route path="completed" element={<TodoCreate />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  );
};
