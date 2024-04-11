import { createRoot } from 'react-dom/client';

import './style/index.scss';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
