import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { NotificationContextProvider } from './context/NotificationContext';
import { LoadingContextProvider } from './context/LoadingContext';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <NotificationContextProvider>
      <LoadingContextProvider>
        <App />
      </LoadingContextProvider>
    </NotificationContextProvider>,
  );
