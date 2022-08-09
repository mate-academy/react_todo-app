// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root'),
// );

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<HashRouter><App /></HashRouter>);
