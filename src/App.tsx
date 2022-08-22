import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
            path="*"
            element={<p>Page not found</p>}
          />
        </Routes>
      </header>
    </div>
  );
};
