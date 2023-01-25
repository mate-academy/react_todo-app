// import ReactDOM from 'react-dom';
import createRoot from 'react-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
// import { AuthProvider } from './context/AuthProvider';

import { App } from './App';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root'),
// );

createRoot.render(
  // <AuthProvider>
  <App />,
  // </AuthProvider>,
  document.getElementById('root'),
);
