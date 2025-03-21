import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { App } from './App';
import MainContext from './Context/MainContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <MainContext>
    <App />
  </MainContext>,
);
