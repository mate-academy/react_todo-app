/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Routes>
        <Route path="/">
          <Route index element={<TodoApp />} />
          <Route path=":status" element={<TodoApp />} />
        </Route>
      </Routes>
    </div>
  );
};
