import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <Routes>
          <Route path="/">
            <Route index element={<TodoApp />} />
            <Route path="active" element={<TodoApp />} />
            <Route path="completed" element={<TodoApp />} />
          </Route>
          <Route
            path="home"
            element={<Navigate to="/" />}
          />
          <Route
            path="*"
            element={<p>Page not found</p>}
          />
        </Routes>
      </header>
    </div>
  );
};
