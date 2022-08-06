import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
// import { createUser } from './api/user';
import { TodoApp } from './components/todoApp';
import { TodosProvider } from './components/todoContext';

export const App: React.FC = () => {
  // const user = createUser({
  //   name: 'Denys',
  //   username: 'MateStudent',
  //   email: 'matestudentsdDenys@example.com',
  //   phone: '1234567890',
  // }).then(userFromServer => console.log(userFromServer));

  // console.log(user);

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={(
            <TodosProvider>
              <TodoApp />
            </TodosProvider>
          )}
        />
        <Route
          path=":filterBy"
          element={(
            <TodosProvider>
              <TodoApp />
            </TodosProvider>
          )}
        />
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route
        path="*"
        element={<h1>Page not found</h1>}
      />
    </Routes>
  );
};
