/* eslint-disable jsx-a11y/control-has-associated-label */
import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './Components/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TodoApp />} />
        <Route path="/active" element={<TodoApp />} />
        <Route path="/completed" element={<TodoApp />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );
};
