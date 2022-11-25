import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthForm } from './components/Auth/AuthForm';
import { TodosPage } from './components/Pages/todosPage';
import { User } from './types/User';

export const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      const userFromLocalStorage = JSON.parse(userData) as User;

      setUser(userFromLocalStorage);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<AuthForm onLogin={setUser} />}
      />

      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path={`${user?.id}/todos`} element={<TodosPage user={user} />} />

      <Route
        path="*"
        element={(
          <h1 className="title">
            You must to register
          </h1>
        )}
      />
    </Routes>
  );
};
