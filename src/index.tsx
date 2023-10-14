import ReactDOM from 'react-dom';
import { AppContext } from './Contexts/Context';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

ReactDOM.render(
  <AppContext>
    <App />
  </AppContext>,
  document.getElementById('root'),
);
