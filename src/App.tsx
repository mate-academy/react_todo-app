/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { TodoPage } from './components/TodoPage';

export const App: FC = () => {
  <Routes>
    <Route path="/" element={(<TodoPage />)} />
    <Route path="/home" element={<Navigate to="/" />} />
    <Route path="/todos" element={<Navigate to="/" />} />
    <Route path="*" element={<p>Page not found</p>} />
  </Routes>;

  return (
    <TodoPage />
  );
};
