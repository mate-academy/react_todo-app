import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { RegForm } from './components/RegForm/RegForm';
import { AuthPage } from './Pages/AuthPage';
import { TodoPage } from './Pages/TodoPage';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/auth" />} />

    <Route path="/auth">
      <Route index element={<AuthPage />} />
      <Route path="reg" element={<RegForm />} />
    </Route>

    <Route path="/todos">
      <Route index element={<TodoPage />} />
      <Route path="userId" element={<TodoPage />} />
      <Route path=":filter" element={<TodoPage />} />
    </Route>

    <Route path="*" element={<h1> Hello </h1>} />
  </Routes>
);
