import ReactDOM from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.scss';

import { HashRouter } from 'react-router-dom';
import { App } from './App';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root'),
// );

const Root = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Root />);
