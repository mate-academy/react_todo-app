import React from 'react';

import { Route, Routes } from 'react-router-dom';
import TodoApp from './components/TodoApp/TodoApp';
import { TodoProvider } from './TodoContext';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={(
            <TodoProvider>
              <TodoApp />
            </TodoProvider>
          )}
        />

        <Route
          path=":status"
          element={(
            <TodoProvider>
              <TodoApp />
            </TodoProvider>
          )}
        />
      </Route>
    </Routes>
  );
};
