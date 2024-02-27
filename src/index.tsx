import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

// import { App } from './App';
// import { Context } from './components/Context/Context';
import React from 'react';
import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
