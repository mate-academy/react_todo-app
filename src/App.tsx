import {
  FC,
  useContext,
  useEffect,
} from 'react';

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { AuthContext } from './context/AuthContext';
import { AuthForm } from './components/AuthForm';
import { NotFoundPage } from './pages/NotFoundPage';
import { TodosPage } from './pages/TodosPage';
import { User } from './types/User';

export const App: FC = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      const userFromLocalStorage = JSON.parse(userData) as User;

      setUser(userFromLocalStorage);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/todos" element={<TodosPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
