import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { TodoPage } from './components/TodoPage';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<TodoPage />} />
    <Route path="*" element={<p>Page not found</p>} />
    <Route index element={<TodoPage />} />
    <Route path=":filter" element={<TodoPage />} />
  </Routes>
);
