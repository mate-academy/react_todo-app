import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (

    <Routes>
      <Route path="/" element={<TodoApp />}>
        <Route path=":filter" element={<TodoApp />} />
      </Route>
    </Routes>

  );
};
