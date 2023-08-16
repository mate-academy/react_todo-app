/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoApp />}>
          <Route index element={<TodoApp />} />
          <Route path="completed" element={<TodoApp />} />
          <Route path="active" element={<TodoApp />} />
        </Route>
      </Routes>
    </Router>
  );
};
