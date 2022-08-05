/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TodoApp />} />
        <Route path="/active" element={<TodoApp />} />
        <Route path="/completed" element={<TodoApp />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
