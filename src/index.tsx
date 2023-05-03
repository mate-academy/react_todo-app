import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import './styles/index.scss';

import { App } from './App';
// import { HashRouter } from 'react-router-dom';

const Root = () => (
  // <HashRouter>
  <App />
  // </HashRouter>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
