import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import './styles/main.scss';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
