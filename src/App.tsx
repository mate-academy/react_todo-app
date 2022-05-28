import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TodoList } from './Pages/TodoList';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { TodoProvider } from './hoc/TodoProvider';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodoList />} />
          <Route path="active" element={<TodoList />} />
          <Route path="completed" element={<TodoList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </TodoProvider>
  );
};
