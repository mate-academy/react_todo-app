import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import TodoApp from './TodoApp';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root'),
);
