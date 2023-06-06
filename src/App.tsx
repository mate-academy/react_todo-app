import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './TodoApp';

export const App = () => (
  <Routes>
    <Route path="/" element={<TodoApp />}>
      <Route path=":filtered" element={<TodoApp />} />
    </Route>
  </Routes>
);
