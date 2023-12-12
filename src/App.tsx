import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { TodosProvider } from './Context/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <Header />

        <Main />

        <Footer />
      </TodosProvider>
    </div>
  );
};
