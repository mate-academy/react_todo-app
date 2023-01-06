import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';

const Root = () => (
  <App />
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
