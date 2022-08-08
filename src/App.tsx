import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TodoApp from './components/TodoApp';
import TodoProvider from './TodoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<TodoApp />}
          />

          <Route
            path=":status"
            element={<TodoApp />}
          />
        </Route>
      </Routes>
    </TodoProvider>
  );
};
