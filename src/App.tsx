import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={(<TodoApp />)} />
        <Route path=":status" element={(<TodoApp />)} />
      </Route>
    </Routes>
  );
};
