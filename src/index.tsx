import { HashRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/todo-list.scss';
import './styles/filters.scss';
import './styles/button.scss';

import { TodoApp } from './TodoApp';
import { TodosProvider } from './TodosProvider';
import { TodoList } from './TodoList';
import { LoginForm } from './LoginForm';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <TodosProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<TodoApp />}>
          <Route index element={<LoginForm />} />
          <Route path=":username" element={<TodoList />}>
            <Route index element={<TodoList />} />
            <Route path=":filter" element={<TodoList />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </TodosProvider>,
);
