import { Routes, Route } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />} />
    </Routes>
  );
};
