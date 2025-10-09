import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { AppContext } from './AppContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<AppContext />);
