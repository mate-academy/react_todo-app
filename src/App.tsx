/* eslint-disable jsx-a11y/control-has-associated-label */
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TodoApp />} />
        <Route path="/completed" element={<TodoApp />} />
        <Route path="/active" element={<TodoApp />} />
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
};
