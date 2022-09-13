/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthForm } from './components/AuthForm';

import { TodoApp } from './components/TodoApp';
import { User } from './types/User';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Routes>
      <Route path="/" element={<AuthForm onLogin={setUser} />} />
      <Route path="todos">
        <Route
          index
          element={user ? <TodoApp user={user} /> : <Navigate to="/" />}
        />
        <Route path=":filterParam" element={user && <TodoApp user={user} />} />
      </Route>
    </Routes>
  );
};
