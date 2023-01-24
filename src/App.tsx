import { FC, useContext } from 'react';
import {
  Navigate, Route, Routes, useMatch,
} from 'react-router-dom';
import { AuthForm } from './components/AuthForm/AuthForm';
import { AuthContext } from './contexts/AuthContext';
import { NotFoundPage } from './pages/NotFoundPage';
import { ToDosPage } from './pages/ToDosPage';

export const App: FC = () => {
  const { user, createSlug } = useContext(AuthContext);
  const match = useMatch('/:userName');

  const checkParam = () => {
    const slug = createSlug(user?.name);

    return !match || slug === match?.params.userName
      ? <ToDosPage />
      : <NotFoundPage />;
  };

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<AuthForm />} />

        <Route path=":userName">
          <Route index element={checkParam()} />
          <Route path="all" element={<ToDosPage />} />
          <Route path="active" element={<ToDosPage />} />
          <Route path="completed" element={<ToDosPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
