import { useRoutes } from 'react-router-dom';

import { TodoPage } from './components/TodoPage/TodoPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export function App() {
  const element = useRoutes([
    { path: '/', element: <TodoPage /> },
    { path: ':filter', element: <TodoPage /> },
    { path: '*', element: <NotFoundPage /> },
  ]);

  return element;
}
