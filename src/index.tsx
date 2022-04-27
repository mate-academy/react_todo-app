import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { TodosProvider } from './components/TodosContext';

ReactDOM.render(
  <TodosProvider>
    <Router>
      <App />
    </Router>
  </TodosProvider>,
  document.getElementById('root'),
);
