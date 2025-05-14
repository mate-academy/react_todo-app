import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
