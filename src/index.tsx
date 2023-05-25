import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import './styles/index.scss';

import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { TodoPage } from './Pages/TodoPage';
import { PageRouters } from './types/PageRouters';
import { NotFoundPage } from './Pages/NotFoundPage';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path={`${PageRouters.Home}`} element={<App />}>
        <Route index element={<TodoPage />} />
        <Route path={`${PageRouters.All}`} element={<TodoPage />} />
        <Route path={`${PageRouters.Active}`} element={<TodoPage />} />
        <Route path={`${PageRouters.Completed}`} element={<TodoPage />} />
      </Route>

      <Route path={`${PageRouters.NotFound}`} element={<NotFoundPage />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root'),
);
