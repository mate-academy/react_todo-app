/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserWarning } from './UserWarning';
import { TodoApp } from './components/TodoApp';

const USER_ID = 10529;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <Routes>
      <Route path="/" element={<TodoApp />}>
        <Route path=":filter" element={<TodoApp />} />
      </Route>
    </Routes>

  );
};
