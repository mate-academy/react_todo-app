import { Routes, Route } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App = () => (

  <Routes>
    <Route path="/">
      <Route index element={<TodoApp />} />
      <Route path="/active" element={<TodoApp />} />
      <Route path="/completed" element={<TodoApp />} />
    </Route>
  </Routes>
);
