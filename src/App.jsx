import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { TodoProvider } from './components/TodoContext';
import { TodoForm } from './components/TodoForm';

export const App = () => (
  <TodoProvider>
    <Routes>
      <Route path="/" element={<TodoForm />}>
        <Route path=":status" element={<TodoForm />} />
      </Route>
    </Routes>
  </TodoProvider>
);
