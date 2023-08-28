import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
// import React from 'react'


import { App } from './App';
import { ToDoProvider } from './ToDoContext';


const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
<ToDoProvider>
  <App />
</ToDoProvider>

);
