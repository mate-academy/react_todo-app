import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { App } from './App';
import { TodoTable } from './components/TodoTable/TodoTable';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route index element={<TodoTable />} />
        <Route path="active" element={<TodoTable />} />
        <Route path="completed" element={<TodoTable />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root'),
);
