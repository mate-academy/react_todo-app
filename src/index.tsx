import { createRoot } from 'react-dom/client';

import './styles/index.css';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
