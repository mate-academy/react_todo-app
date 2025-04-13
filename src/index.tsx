// import { createRoot } from 'react-dom/client';

// import './styles/index.scss';

// import React from 'react';
// // import { createRoot } from 'react-dom/client';
// import { App } from './App';
// import { TodoProvider } from './Components/TodoContext';
// import './styles/index.scss';

// const container = document.getElementById('root') as HTMLDivElement;

// createRoot(container).render(
//   <React.StrictMode>
//     <TodoProvider>
//       <App />
//     </TodoProvider>
//   </React.StrictMode>,
// );

// Removed unused React import
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { TodoProvider } from './Components/TodoContext';
import React from 'react';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
);
