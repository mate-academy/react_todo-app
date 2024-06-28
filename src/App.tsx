import { Route, Routes } from 'react-router-dom';
import { TodosPage } from './components/TodosPage';

export const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<TodosPage />} />
          <Route path=":type" element={<TodosPage />} />
        </Route>
      </Routes>
    </main>
  );
};
