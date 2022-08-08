import React from 'react';
import {
  HashRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoApp />}>
          <Route path=":active" element={<TodoApp />} />
          <Route path=":completed" element={<TodoApp />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
};
