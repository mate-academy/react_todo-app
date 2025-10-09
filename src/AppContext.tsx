import { App } from './App';
import { Provider } from './Context/Context';

export const AppContext: React.FC = () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
