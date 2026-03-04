import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { ErrorProvider } from './context/ErrorContext';
import { GlobalStateProvider } from './context/GlobalProvider';
import { FilterProvider } from './context/FilterContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <ErrorProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </ErrorProvider>
  </GlobalStateProvider>,
);
