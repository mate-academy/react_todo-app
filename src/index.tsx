import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './app/App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
