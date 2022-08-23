import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import './index.css';

import { App } from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find root element');
}

const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
);
