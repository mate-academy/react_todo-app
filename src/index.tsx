import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { TodosProvider } from './components/TodosContext/TodosContext';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

ReactDOM.render(
  <HashRouter>
    <TodosProvider>
      <App />
    </TodosProvider>
  </HashRouter>,
  document.getElementById('root'),
);
