import ReactDOM from 'react-dom';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './styles/index.scss';

import { App } from './App';
import { ContextProvider } from './components/context';
import { LoginForm } from './components/LoginForm';
import { TodosApp } from './components/TodosApp/TodosApp';

ReactDOM.render(
  <ContextProvider>
    <HashRouter>
      <Routes>
        <Route path="" element={<App />}>
          <Route
            path="login"
            element={<LoginForm />}
          />

          <Route
            path="todos"
            element={<TodosApp />}
          />

          <Route
            path="*"
            element={(
              <Navigate
                to={
                  localStorage.getItem('user')
                    ? 'todos'
                    : 'login'
                }
                replace
              />
            )}
          />
          <Route
            index
            element={(
              <Navigate
                to={
                  localStorage.getItem('user')
                    ? 'todos'
                    : 'login'
                }
                replace
              />
            )}
          />
        </Route>
      </Routes>
    </HashRouter>
  </ContextProvider>,
  document.getElementById('root'),
);
