import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import React from 'react';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
