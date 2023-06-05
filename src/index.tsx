import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { TodoApp } from './components/TodoApp';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<TodoApp />} />
        <Route path="completed" element={<TodoApp />} />
        <Route path="active" element={<TodoApp />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root'),
);
