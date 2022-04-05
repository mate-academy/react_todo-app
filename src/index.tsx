import ReactDOM from 'react-dom';

import './styles/index.scss';
import './styles/todo-list.scss';
import './styles/filters.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
