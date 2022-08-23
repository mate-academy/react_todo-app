import { HashRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { TodoApp } from './TodoApp';
import { TodosProvider } from './TodosProvider';
import { LoginForm } from './LoginForm';
import { Todos } from './Todos';

const container = document.getElementById('root');
// eslint-disable-next-line
const root = createRoot(container!);

root.render(
  <TodosProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<TodoApp />}>
          <Route index element={<LoginForm />} />
          <Route path=":username">
            <Route index element={<Todos />} />
            <Route path=":filter" element={<Todos />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </TodosProvider>,
);
